require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_LIVE);
const app = express();
app.use(express.static(path.join(__dirname, 'docs')));
app.use(cors());
// Хранилище draft'ов (в памяти) — ЗАМЕНИШЬ на БД
// draftId -> { id, products, comment, customer, status, exported }
const drafts = new Map();

app.use(cors());
app.use(express.static(path.join(__dirname, 'docs')));

// ---------- 1. WEBHOOK (raw) ----------
app.post(
  '/webhook/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET_TEST
      );
    } catch (e) {
      console.error('Signature error:', e.message);
      return res.status(400).send('Bad signature');
    }

    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await handleCheckoutSessionCompleted(session);
      }
      res.json({ received: true });
    } catch (err) {
      // Если ошибка внутри — возвращаем 500, Stripe повторит.
      console.error('Webhook handler error:', err);
      return res.status(500).send('Webhook processing failed');
    }
  }
);

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { products, comment } = req.body;

  try {
    // Создаём draftId
    const draftId = crypto.randomUUID();
    // Сохраняем draft
    drafts.set(draftId, {
      id: draftId,
      products,
      comment,
      status: 'pending',
      exported: false,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map((product) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            description: `
              Size: ${product.size.name}.\n
              Extras: ${product.extras.map((extra) => extra.name).join(', ')}`,
            images: [`${process.env.DOMAIN}${product.primaryImage}`],
          },
          unit_amount: Math.round(
            parseFloat(product.priceTotal.replace(/[^0-9.]/g, '')) * 100
          ),
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        draft_id: draftId,
        comment,
      },
    });
    console.log('[CREATE] session', session.id, 'draft', draftId);
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
});

app.get('/api/stripe/checkout-session', async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) {
    return res.status(400).json({ error: 'session_id is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({
      session,
    });
  } catch (error) {
    res.status(400).json({
      error,
      message: error.message,
    });
  }
});

// ---------- 4. Получить Session (для success страницы) ----------
app.get('/api/stripe/checkout-session', async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) {
    return res.status(400).json({ message: 'session_id is required' });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({ session });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ---------- 5. SPA fallback ----------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// ---------- 6. Обработка успешной оплаты ----------
async function handleCheckoutSessionCompleted(session) {
  const draftId = session.metadata.draft_id;
  if (!draftId) {
    console.warn('No draft_id in metadata');
    return;
  }
  const draft = drafts.get(draftId);
  if (!draft) {
    console.warn('Draft not found', draftId);
    return;
  }

  // Идемпотентность
  if (draft.status === 'paid' && draft.exported) {
    console.log('Draft already processed', draftId);
    return;
  }

  draft.status = 'paid';

  // Здесь отправка в Google или Email
  try {
    if (process.env.GOOGLE_SCRIPT_URL) {
      await exportToGoogle(draft, session);
      console.log('Exported to Google', draftId);
    }
    // Если добавишь email — вызови sendOrderEmail(order)
    draft.exported = true;
  } catch (e) {
    console.error('Export failed (will retry via retry webhook):', e.message);
    // Бросаем ошибку — webhook вернёт 500 и Stripe повторит
    throw e;
  }
}

// ---------- 7. Отправка в Google Apps Script ----------
async function exportToGoogle(draft, session) {
  const url = process.env.CART_GOOGLE_SCRIPT_URL;
  if (!url) return;

  const payload = {
    orderId: draft.id,
    sessionId: session.id,
    amount: session.amount_total, // в центах
    currency: session.currency,
    comment: draft.comment,
    customer: draft.customer,
    products: draft.products,
    paidAt: new Date().toISOString(),
  };

  // Если Node < 18: раскомментируй импорт node-fetch
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error('Google export failed: ' + resp.status + ' ' + text);
  }
}

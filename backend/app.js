require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_LIVE);
const app = express();
app.use(express.static(path.join(__dirname, 'docs')));
app.use(cors());

const mysql = require('mysql2/promise');

/*
AIzaSyB7cdhg24cUpmGyQ2y0tjV7EU6h2ytVaDU Google Maps Platform

*/

// Подключение к базе
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
});

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

app.get('/api/autocomplete', async (req, res) => {
  const { input } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${process.env.GOOGLE_CONSOLE_CLOUD}&language=en&types=address`;
  const result = await axios.get(url);
  res.json(result.data.predictions); // тут только place_id, description и т.п.
});

// 2. Получить детали по place_id
app.get('/api/place-details', async (req, res) => {
  const { place_id } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.GOOGLE_CONSOLE_CLOUD}&language=en`;
  const result = await axios.get(url);
  res.json(result.data.result); // тут будет address_components
});

// --- Новый эндпоинт: получить все цветы ---
app.get('/api/flowers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flowers');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flowers' });
  }
});

// --- Новый эндпоинт: получить один цветок по id ---
app.get('/api/flowers/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flowers WHERE id = ?', [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Flower not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flower' });
  }
});

// --- Новый эндпоинт: получить все размеры цветов ---
app.get('/api/flower-sizes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flower_sizes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flower sizes' });
  }
});

// --- Новый эндпоинт: получить один размер по id ---
app.get('/api/flower-sizes/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flower_sizes WHERE id = ?', [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Flower size not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flower size' });
  }
});

app.get('/api/flower-extras', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, price FROM flower_extras');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flower_extras' });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  const { products, comment } = req.body;

  /*
  {
  "items": [
    { "flowerId": 1, "sizeId": 2, "extras": [3,4], "quantity": 2 }
  ]
}
  */

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
// ----
app.post('/test-stripe', async (req, res) => {
  const { products } = req.body;

  try {
    // 1. Получаем id всех букетов из запроса
    const flowerIds = products.map((product) => product.id);

    // 2. Делаем один запрос по всем id (оптимально)
    const [flowersRows] = await db.query(
      `SELECT * FROM flowers WHERE id IN (${flowerIds
        .map(() => '?')
        .join(',')})`,
      flowerIds
    );

    // 3. Собираем корзину товаров (только существующие в базе)
    const cartItems = [];
    let subtotal = 0;
    for (const product of products) {
      const flower = flowersRows.find((f) => f.id === product.id);
      if (!flower) throw new Error(`Flower not found: id=${product.id}`);

      const totalPrice = flower.price * product.quantity; // price уже в центах!
      subtotal += totalPrice;

      cartItems.push({
        title: flower.title,
        primaryImage: flower.primaryImage,
        price: flower.price,
        quantity: product.quantity,
      });
    }

    // 4. Считаем налог 7%
    const taxAmount = Math.round(subtotal * 0.07);

    // 6. Формируем line_items для Stripe (товары + налог)
    const line_items = [
      ...cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.primaryImage
              ? [`${process.env.DOMAIN}${item.primaryImage}`]
              : [],
          },
          unit_amount: item.price, // уже в центах!
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sales Tax (7%)',
            description: 'Sales tax for your order',
          },
          unit_amount: taxAmount, // центы
        },
        quantity: 1,
      },
    ];

    // 7. Создаём Stripe session
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items,
    //   mode: 'payment',
    //   success_url: `${process.env.DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.DOMAIN}/checkout/cancel`,
    //   shipping_address_collection: {
    //     allowed_countries: ['US'],
    //   },
    //   phone_number_collection: {
    //     enabled: true,
    //   },
    //   metadata: {
    //     draft_id: draftId,
    //     comment,
    //   },
    // });

    // console.log('[CREATE] session', session.id, 'draft', draftId);
    // res.json({ sessionId: session.id });
    res.json({ line_items });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      error,
      message: error.message,
    });
  }
});

const STUDIO_ADDRESS = '9800 Grand Verde Way, Boca Raton, FL 33428';
const BASE_FEE = 5;
const PER_MILE_FEE = 1.5;
const FREE_RADIUS_MILES = 5;
app.post('/api/delivery-fee', async (req, res) => {
  const { userAddress } = req.body;
  if (!userAddress)
    return res.status(400).json({ error: 'No address provided' });

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(
    STUDIO_ADDRESS
  )}&destinations=${encodeURIComponent(userAddress)}&key=${
    process.env.GOOGLE_CONSOLE_CLOUD
  }`;

  try {
    const apiRes = await axios.get(url);
    const data = apiRes.data;

    if (
      !data.rows ||
      !data.rows[0] ||
      !data.rows[0].elements[0] ||
      data.rows[0].elements[0].status !== 'OK'
    ) {
      return res.json({ fee: null, message: 'Не удалось получить расстояние' });
    }

    const distanceText = data.rows[0].elements[0].distance.text; // "6.1 mi"
    const distanceMiles = parseFloat(distanceText);

    if (distanceMiles <= FREE_RADIUS_MILES) {
      return res.json({ fee: 0, message: 'Бесплатная доставка!' });
    } else {
      const total = BASE_FEE + distanceMiles * PER_MILE_FEE;
      return res.json({
        fee: total,
        message: `Base Fee: $${BASE_FEE}\nMileage Fee: ${distanceMiles} × $${PER_MILE_FEE} = $${(
          distanceMiles * PER_MILE_FEE
        ).toFixed(2)}\nTotal: $${total.toFixed(2)}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      fee: null,
      message: 'Ошибка при обращении к сервису Google Maps',
      error: error.message,
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

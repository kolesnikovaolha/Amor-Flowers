require('dotenv').config();

// const crypto = require('crypto');
const path = require('path');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_LIVE);
const mysql = require('mysql2/promise');
const app = express();
app.use(express.static(path.join(__dirname, 'docs')));
app.use(cors());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'docs')));
app.use(express.json());

// --- Получить все цветы ---
app.get('/api/flowers', async (req, res) => {
  try {
    const [flowers] = await db.query(`
      SELECT 
        f.*, 
        (
          SELECT s.price 
          FROM flower_sizes s 
          WHERE s.flowerId = f.id 
          ORDER BY s.value ASC LIMIT 1
        ) as price
      FROM flowers f
    `);

    const result = flowers.map((flower) => ({
      id: flower.id,
      title: flower.title,
      primaryImage: flower.primaryImage,
      secondaryImage: flower.secondaryImage,
      currency: flower.currency,
      currencySymbol: flower.currencySymbol,
      price: flower.price,
      soldOut: !!flower.soldOut,
      sale: !!flower.sale,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flowers' });
  }
});

// Получить все дополнения
app.get('/api/flower/extras', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, price FROM flower_extras');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flower_extras' });
  }
});

// --- получить один цветок по id ---
app.get('/api/flower/:id', async (req, res) => {
  try {
    const [flowers] = await db.query('SELECT * FROM flowers WHERE id = ?', [
      req.params.id,
    ]);
    if (!flowers.length) {
      return res.status(404).json({ error: 'Flower not found' });
    }
    const flower = flowers[0];
    const [sizes] = await db.query(
      'SELECT * FROM flower_sizes WHERE flowerId = ?',
      [flower.id]
    );

    const result = {
      id: flower.id,
      title: flower.title,
      primaryImage: flower.primaryImage,
      secondaryImage: flower.secondaryImage,
      currency: flower.currency,
      currencySymbol: flower.currencySymbol,
      soldOut: !!flower.soldOut,
      sale: !!flower.sale,
      sizeId: sizes[0].id,
      extraIds: [],
      quantity: 1,
    };
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flower' });
  }
});

// Получить размеры для конкретного цветка по id
app.get('/api/flower/:id/sizes', async (req, res) => {
  try {
    const flowerId = req.params.id;
    const [rows] = await db.query(
      'SELECT * FROM flower_sizes WHERE flowerId = ?',
      [flowerId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flower sizes' });
  }
});

// Получить адрес
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

// 2. Получить детали по place_id + автозаполнение адреса
app.get('/api/full-address-details', async (req, res) => {
  try {
    const { input } = req.query;
    if (!input) return res.status(400).json({ error: 'input required' });

    // 1. Autocomplete только по US, ближе к Флориде
    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${
      process.env.GOOGLE_CONSOLE_CLOUD
    }&language=en&types=address&components=country:us&location=27.9944024,-81.7602544&radius=350000`;

    const autoRes = await axios.get(autocompleteUrl);
    let predictions = autoRes.data.predictions;

    // Фильтруем по наличию 'FL' в адресе
    predictions = predictions.filter(
      (p) =>
        p.description.includes(', FL') ||
        p.structured_formatting?.secondary_text?.includes(', FL')
    );

    if (!predictions.length) {
      return res.json({ predictions: [], details: null });
    }

    // 2. Details для первого результата
    const placeId = predictions[0].place_id;
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_CONSOLE_CLOUD}&language=en`;
    const detailsRes = await axios.get(detailsUrl);

    res.json({
      predictions,
      details: detailsRes.data.result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- 4. Delivery Fee ----------
// ---------- Constants ----------
const STUDIO_ADDRESS = '9800 Grand Verde Way, Boca Raton, FL 33428';
const BASE_FEE = 5;
const PER_MILE_FEE = 1.5;
const FREE_RADIUS_MILES = 5;

// ---------- Helper Function: Calculate Delivery Fee ----------
async function calculateDeliveryFee(userAddress) {
  if (!userAddress) {
    return { fee: 0, miles: 0, message: 'No address provided' };
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(
    STUDIO_ADDRESS
  )}&destinations=${encodeURIComponent(userAddress)}&key=${
    process.env.GOOGLE_CONSOLE_CLOUD
  }`;

  try {
    const apiRes = await axios.get(url);
    const elem = apiRes.data?.rows?.[0]?.elements?.[0];

    if (!elem || elem.status !== 'OK') {
      return { fee: 0, miles: 0, message: 'Could not calculate distance' };
    }

    // Parse miles from distance text (e.g., "48.9 mi")
    const distanceText = elem.distance.text;
    const milesMatch = distanceText.match(/[\d.]+/);
    const distanceMiles = milesMatch ? parseFloat(milesMatch[0]) : 0;

    if (distanceMiles <= FREE_RADIUS_MILES) {
      return {
        fee: 0,
        miles: distanceMiles,
        message: 'Free delivery!',
      };
    }

    const mileageFee = distanceMiles * PER_MILE_FEE;
    const total = BASE_FEE + mileageFee;

    return {
      fee: Math.round(total * 100), // В центах для Stripe
      miles: parseFloat(distanceMiles.toFixed(1)),
      message: `Base: $${BASE_FEE} + ${distanceMiles.toFixed(
        1
      )} mi × $${PER_MILE_FEE} = $${total.toFixed(2)}`,
    };
  } catch (error) {
    console.error('Delivery fee calculation error:', error.message);
    return { fee: 0, miles: 0, message: 'Error calculating delivery' };
  }
}

// ---------- Endpoint: Get Delivery Fee ----------
app.post('/api/delivery-fee', async (req, res) => {
  const { userAddress } = req.body;

  // if (!userAddress) {
  //   return res.status(400).json({ error: 'No address provided' });
  // }

  try {
    const result = await calculateDeliveryFee(userAddress);

    return res.json({
      fee: result.fee / 100, // Возвращаем в долларах
      miles: result.miles,
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      fee: null,
      message: 'Error calculating delivery fee',
      error: error.message,
    });
  }
});
// ---------- !5. Stripe Checkout Session ----------
app.post('/create-checkout-session', async (req, res) => {
  const { products, comment, address } = req.body;

  try {
    const flowerIds = products.map((p) => p.id);
    const sizeIds = products.map((p) => p.sizeId);
    const extrasIds = products.flatMap((p) => p.extraIds);

    // Загружаем цветы
    const [flowersRows] = await db.query(
      `SELECT * FROM flowers WHERE id IN (${flowerIds
        .map(() => '?')
        .join(',')})`,
      flowerIds
    );

    // Загружаем размеры по id и flowerId (если нужно уникальное соответствие — иначе просто по id)
    const [sizesRows] = await db.query(
      `SELECT * FROM flower_sizes WHERE id IN (${sizeIds
        .map(() => '?')
        .join(',')})`,
      sizeIds
    );

    // Загружаем extras
    let extrasRows = [];
    if (extrasIds.length) {
      [extrasRows] = await db.query(
        `SELECT * FROM flower_extras WHERE id IN (${extrasIds
          .map(() => '?')
          .join(',')})`,
        extrasIds
      );
    }

    const flowersMap = new Map(
      flowersRows.map((flower) => [flower.id, flower])
    );
    const sizesMap = new Map(sizesRows.map((size) => [size.id, size]));
    const extrasMap = new Map(extrasRows.map((extra) => [extra.id, extra]));

    // Формируем корзину
    const cartItems = products.map((product) => {
      const flower = flowersMap.get(product.id);
      const flowerSize = sizesMap.get(product.sizeId);
      const flowerExtras = product.extraIds
        .map((extraId) => extrasMap.get(extraId))
        .filter(Boolean);

      if (!flower) throw new Error(`Flower not found: id=${product.id}`);
      if (!flowerSize) throw new Error(`Size not found: id=${product.sizeId}`);

      const extrasPrice = flowerExtras.reduce(
        (sum, flowerExtra) => sum + flowerExtra.price,
        0
      );
      const unitTotal = flowerSize.price + extrasPrice;

      return {
        title: flower.title,
        primaryImage: flower.primaryImage,
        size: flowerSize,
        extras: flowerExtras,
        quantity: product.quantity,
        price: unitTotal,
        total: unitTotal * product.quantity,
      };
    });

    // subtotal через reduce
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    // 4. Считаем доставку
    const deliveryResult = await calculateDeliveryFee(address);
    const deliveryFee = deliveryResult.fee; // уже в центах

    // Налог
    const taxAmount = Math.round(subtotal * 0.07);

    // Stripe line_items
    const line_items = cartItems
      .map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [`${process.env.DOMAIN}${item.primaryImage}`],
            description: `Size: ${item.size.name}\nExtras:\n${item.extras
              .map((extra) => '- ' + extra.name)
              .join('\n')}`,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }))
      .concat([
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sales Tax (7%)',
              description: 'Sales tax for your order',
            },
            unit_amount: taxAmount,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Delivery Fee',
              description: `Delivery to address: ${address}\nDistance: ${deliveryResult.miles} mi`,
            },
            unit_amount: deliveryFee,
          },
          quantity: 1,
        },
      ]);

    // Создаём Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        comment,
        shipping_address:
          typeof address === 'string' ? address : JSON.stringify(address),
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error, message: error.message });
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

// ---------- 5. SPA fallback ----------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

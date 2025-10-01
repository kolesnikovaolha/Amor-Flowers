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

// async function testConnection() {
//   try {
//     const connection = await db.getConnection();
//     console.log('✅ Подключение к удаленной БД успешно!');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Ошибка подключения:', error.message);
//     console.error('Код:', error.code);
//   }
// }

// testConnection();

// --- Новый эндпоинт: получить все цветы ---
app.get('/api/flowers', async (req, res) => {
  try {
    const [flowers] = await db.query('SELECT * FROM flowers');
    console.log('Пришел POST-запрос на /api/flowers');
    console.log('Данные:', req.body);

    const result = flowers.map((flower) => ({
      id: flower.id,
      title: flower.title,
      primaryImage: flower.primaryImage,
      secondaryImage: flower.secondaryImage,
      currency: flower.currency,
      currencySymbol: flower.currencySymbol,
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

// --- Новый эндпоинт: получить один цветок по id ---
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
// ---------- 3. Создать Checkout Session ----------
app.post('/create-checkout-session', async (req, res) => {
  const { products, comment } = req.body;
  try {
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
        comment,
      },
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
});

// app.post('/create-checkout-session', async (req, res) => {
//   const { products, comment } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: products.map((product) => ({
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: product.title,
//             description: `
//               Size: ${product.size.name}.\n
//               Extras: ${product.extras.map((extra) => extra.name).join(', ')}`,
//             images: [`${process.env.DOMAIN}${product.primaryImage}`],
//           },
//           unit_amount: Math.round(
//             parseFloat(product.priceTotal.replace(/[^0-9.]/g, '')) * 100
//           ),
//         },
//         quantity: product.quantity,
//       })),
//       mode: 'payment',
//       success_url: `${process.env.DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.DOMAIN}/checkout/cancel`,
//       shipping_address_collection: {
//         allowed_countries: ['US'],
//       },
//       phone_number_collection: {
//         enabled: true,
//       },
//       metadata: {
//         comment,
//       },
//     });
//     res.json({ sessionId: session.id });
//   } catch (error) {
//     res.status(500).json({
//       error,
//       message: error.message,
//     });
//   }
// });

// REAL DATA VERSION
app.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    const flowerIds = products.map((p) => p.id);
    // const sizeIds = products.map((p) => p.size.id);
    const extrasIds = products.flatMap((p) => p.extraIds);

    // 1. Собираем условия для size по парам (id, flowerId)
    const sizeConditions = products
      .map(() => `(id = ? AND flowerId = ?)`)
      .join(' OR ');
    const sizeParams = products.flatMap((p) => [p.sizeId, p.id]);

    const [flowersRows] = await db.query(
      `SELECT * FROM flowers WHERE id IN (${flowerIds
        .map(() => '?')
        .join(',')})`,
      flowerIds
    );
    const [sizesRows] = await db.query(
      `SELECT * FROM flower_sizes WHERE ${sizeConditions}`,
      sizeParams
    );

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
    const sizesMap = new Map(
      sizesRows.map((size) => [`${size.id}-${size.flowerId}`, size])
    );
    const extrasMap = new Map(extrasRows.map((extra) => [extra.id, extra]));

    // Формируем cartItems с помощью map
    const cartItems = products.map((product) => {
      const flower = flowersMap.get(product.id);
      const size = sizesMap.get(`${product.sizeId}-${product.id}`);
      const productExtras = product.extraIds.map((extraId) =>
        extrasMap.get(extraId)
      );

      if (!flower) throw new Error(`Flower not found: id=${product.id}`);
      if (!size) throw new Error(`Size not found: id=${product.sizeId}`);

      const extrasPrice = productExtras.reduce((sum, e) => sum + e.price, 0);
      const unitTotal = size.price + extrasPrice;

      return {
        title: flower.title + (size.name ? ` (${size.name})` : ''),
        primaryImage: flower.primaryImage,
        price: unitTotal,
        quantity: product.quantity,
        extras: productExtras.map((e) => e.name),
        total: unitTotal * product.quantity,
      };
    });

    // subtotal через reduce
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    // Налог
    const taxAmount = Math.round(subtotal * 0.07);

    // line_items через map + concat
    const line_items = cartItems
      .map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.primaryImage
              ? [`${process.env.DOMAIN}${item.primaryImage}`]
              : [],
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
      ]);

    res.json({ line_items });
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
// ----
// app.post('/test-stripe', async (req, res) => {
//   const { products } = req.body;

//   try {
//     // 1. Получаем id всех букетов из запроса
//     const flowerIds = products.map((product) => product.id);

//     // 2. Делаем один запрос по всем id (оптимально)
//     const [flowersRows] = await db.query(
//       `SELECT * FROM flowers WHERE id IN (${flowerIds
//         .map(() => '?')
//         .join(',')})`,
//       flowerIds
//     );

//     // 3. Собираем корзину товаров (только существующие в базе)
//     const cartItems = [];
//     let subtotal = 0;
//     for (const product of products) {
//       const flower = flowersRows.find((f) => f.id === product.id);
//       if (!flower) throw new Error(`Flower not found: id=${product.id}`);

//       const totalPrice = flower.price * product.quantity; // price уже в центах!
//       subtotal += totalPrice;

//       cartItems.push({
//         title: flower.title,
//         primaryImage: flower.primaryImage,
//         price: flower.price,
//         quantity: product.quantity,
//       });
//     }

//     // 4. Считаем налог 7%
//     const taxAmount = Math.round(subtotal * 0.07);

//     // 6. Формируем line_items для Stripe (товары + налог)
//     const line_items = [
//       ...cartItems.map((item) => ({
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: item.title,
//             images: item.primaryImage
//               ? [`${process.env.DOMAIN}${item.primaryImage}`]
//               : [],
//           },
//           unit_amount: item.price, // уже в центах!
//         },
//         quantity: item.quantity,
//       })),
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Sales Tax (7%)',
//             description: 'Sales tax for your order',
//           },
//           unit_amount: taxAmount, // центы
//         },
//         quantity: 1,
//       },
//     ];

//     // 7. Создаём Stripe session
//     // const session = await stripe.checkout.sessions.create({
//     //   payment_method_types: ['card'],
//     //   line_items,
//     //   mode: 'payment',
//     //   success_url: `${process.env.DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//     //   cancel_url: `${process.env.DOMAIN}/checkout/cancel`,
//     //   shipping_address_collection: {
//     //     allowed_countries: ['US'],
//     //   },
//     //   phone_number_collection: {
//     //     enabled: true,
//     //   },
//     //   metadata: {
//     //     draft_id: draftId,
//     //     comment,
//     //   },
//     // });

//     // console.log('[CREATE] session', session.id, 'draft', draftId);
//     // res.json({ sessionId: session.id });
//     res.json({ line_items });
//   } catch (error) {
//     console.error('Checkout error:', error);
//     res.status(500).json({
//       error,
//       message: error.message,
//     });
//   }
// });

app.post('/api/test-stripe', async (req, res) => {
  const { products } = req.body;

  try {
    const flowerIds = products.map((p) => p.id);
    // const sizeIds = products.map((p) => p.size.id);
    const extrasIds = products.flatMap((p) => p.extras.map((e) => e.id));

    // 1. Собираем условия для size по парам (id, flowerId)
    const sizeConditions = products
      .map(() => `(id = ? AND flowerId = ?)`)
      .join(' OR ');
    const sizeParams = products.flatMap((p) => [p.size.value, p.id]);

    const [flowersRows] = await db.query(
      `SELECT * FROM flowers WHERE id IN (${flowerIds
        .map(() => '?')
        .join(',')})`,
      flowerIds
    );
    const [sizesRows] = await db.query(
      `SELECT * FROM flower_sizes WHERE ${sizeConditions}`,
      sizeParams
    );

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
    const sizesMap = new Map(
      sizesRows.map((size) => [`${size.value}-${size.flowerId}`, size])
    );
    const extrasMap = new Map(extrasRows.map((extra) => [extra.id, extra]));

    // Формируем cartItems с помощью map
    const cartItems = products.map((product) => {
      const flower = flowersMap.get(product.id);
      const size = sizesMap.get(`${product.size.value}-${product.id}`);
      const productExtras = product.extras
        .map((e) => e.id)
        .map((extraId) => extrasMap.get(extraId));

      if (!flower) throw new Error(`Flower not found: id=${product.id}`);
      if (!size) throw new Error(`Size not found: id=${product.size.id}`);

      const extrasPrice = productExtras.reduce((sum, e) => sum + e.price, 0);
      const unitTotal = size.price + extrasPrice;

      return {
        title: flower.title + (size.name ? ` (${size.name})` : ''),
        primaryImage: flower.primaryImage,
        price: unitTotal,
        quantity: product.quantity,
        extras: productExtras.map((e) => e.name),
        total: unitTotal * product.quantity,
      };
    });

    // subtotal через reduce
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    // Налог
    const taxAmount = Math.round(subtotal * 0.07);

    // line_items через map + concat
    const line_items = cartItems
      .map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.primaryImage
              ? [`${process.env.DOMAIN}${item.primaryImage}`]
              : [],
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
      ]);

    res.json({ line_items });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error, message: error.message });
  }
});

// ---------- 3. Вычислить Delivery Fee ----------
// const STUDIO_ADDRESS = '9800 Grand Verde Way, Boca Raton, FL 33428';
// const BASE_FEE = 5;
// const PER_MILE_FEE = 1.5;
// const FREE_RADIUS_MILES = 5;
// app.post('/api/delivery-fee', async (req, res) => {
//   const { userAddress } = req.body;
//   if (!userAddress)
//     return res.status(400).json({ error: 'No address provided' });

//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(
//     STUDIO_ADDRESS
//   )}&destinations=${encodeURIComponent(userAddress)}&key=${
//     process.env.GOOGLE_CONSOLE_CLOUD
//   }`;

//   try {
//     const apiRes = await axios.get(url);
//     const data = apiRes.data;

//     if (
//       !data.rows ||
//       !data.rows[0] ||
//       !data.rows[0].elements[0] ||
//       data.rows[0].elements[0].status !== 'OK'
//     ) {
//       return res.json({ fee: null, message: 'Не удалось получить расстояние' });
//     }

//     const distanceText = data.rows[0].elements[0].distance.text; // "6.1 mi"
//     const distanceMiles = parseFloat(distanceText);

//     if (distanceMiles <= FREE_RADIUS_MILES) {
//       return res.json({ fee: 0, message: 'Бесплатная доставка!' });
//     } else {
//       const total = BASE_FEE + distanceMiles * PER_MILE_FEE;
//       return res.json({
//         fee: total,
//         message: `Base Fee: $${BASE_FEE}\nMileage Fee: ${distanceMiles} × $${PER_MILE_FEE} = $${(
//           distanceMiles * PER_MILE_FEE
//         ).toFixed(2)}\nTotal: $${total.toFixed(2)}`,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       fee: null,
//       message: 'Ошибка при обращении к сервису Google Maps',
//       error: error.message,
//     });
//   }
// });

// const STUDIO_ADDRESS = '9800 Grand Verde Way, Boca Raton, FL 33428';
// const BASE_FEE = 5;
// const PER_MILE_FEE = 1.5;
// const FREE_RADIUS_MILES = 5;

// app.post('/api/delivery-fee', async (req, res) => {
//   const { userAddress } = req.body;
//   if (!userAddress) {
//     return res.status(400).json({ error: 'No address provided' });
//   }

//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(
//     STUDIO_ADDRESS
//   )}&destinations=${encodeURIComponent(userAddress)}&key=${
//     process.env.GOOGLE_CONSOLE_CLOUD
//   }`;

//   try {
//     const apiRes = await axios.get(url);
//     const elem = apiRes.data?.rows?.[0]?.elements?.[0];

//     if (!elem || elem.status !== 'OK') {
//       return res.json({ fee: null, message: 'Не удалось получить расстояние' });
//     }

//     // Получаем мили из строки "48.9 mi"
//     const distanceText = elem.distance.text;
//     const milesMatch = distanceText.match(/[\d.]+/);
//     const distanceMiles = milesMatch ? parseFloat(milesMatch[0]) : 0;

//     if (distanceMiles <= FREE_RADIUS_MILES) {
//       return res.json({ fee: 0, message: 'Бесплатная доставка!' });
//     }

//     const mileageFee = distanceMiles * PER_MILE_FEE;
//     const total = BASE_FEE + mileageFee;

//     return res.json({
//       fee: +total.toFixed(2),
//       message: `Base Fee: $${BASE_FEE}\nMileage Fee: ${distanceMiles.toFixed(
//         2
//       )} × $${PER_MILE_FEE} = $${mileageFee.toFixed(
//         2
//       )}\nTotal: $${total.toFixed(2)}`,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       fee: null,
//       message: 'Ошибка при обращении к сервису Google Maps',
//       error: error.message,
//     });
//   }
// });

// ---------- 4. Получить Session (для success страницы) ----------
// app.get('/api/stripe/checkout-session', async (req, res) => {
//   const sessionId = req.query.session_id;
//   if (!sessionId) {
//     return res.status(400).json({ message: 'session_id is required' });
//   }
//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     res.json({ session });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
const STUDIO_ADDRESS = '9800 Grand Verde Way, Boca Raton, FL 33428';
const BASE_FEE = 5;
const PER_MILE_FEE = 1.5;
const FREE_RADIUS_MILES = 5;

app.post('/api/delivery-fee', async (req, res) => {
  const { userAddress } = req.body;
  if (!userAddress) {
    return res.status(400).json({ error: 'No address provided' });
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
      return res.json({ fee: null, message: 'Не удалось получить расстояние' });
    }

    // Парсим мили из строки distance.text (например, "48.9 mi")
    const distanceText = elem.distance.text;
    const milesMatch = distanceText.match(/[\d.]+/);
    const distanceMiles = milesMatch ? parseFloat(milesMatch[0]) : 0;

    if (distanceMiles <= FREE_RADIUS_MILES) {
      return res.json({
        fee: 0,
        miles: distanceMiles,
        message: 'Бесплатная доставка!',
      });
    }

    const mileageFee = distanceMiles * PER_MILE_FEE;
    const total = BASE_FEE + mileageFee;

    return res.json({
      fee: +total.toFixed(2),
      miles: +distanceMiles.toFixed(1), // как в Google Maps UI
      message: `Base Fee: $${BASE_FEE}\nMileage Fee: ${distanceMiles.toFixed(
        1
      )} × $${PER_MILE_FEE} = $${mileageFee.toFixed(
        2
      )}\nTotal: $${total.toFixed(2)}`,
    });
  } catch (error) {
    return res.status(500).json({
      fee: null,
      message: 'Ошибка при обращении к сервису Google Maps',
      error: error.message,
    });
  }
});

// ----------------------------------

// TRY new stripe
// async function calculateDeliveryFee(address) {
//   // Собираем адрес строкой для передачи в endpoint
//   const addressString = [
//     address.address1,
//     address.address2,
//     address.city,
//     address.state,
//     address.zip,
//     address.country,
//   ]
//     .filter(Boolean)
//     .join(', ');

//   const res = await axios.post(
//     // Замените PORT на актуальный порт вашего бэкенда
//     `http://localhost:PORT/api/delivery-fee`,
//     { userAddress: addressString }
//   );
//   const { fee, message } = res.data;
//   return {
//     fee: Math.round(fee * 100), // Stripe требует сумму в центах
//     message,
//   };
// }

// async function calculateDeliveryFee(addressStr) {
//   const res = await axios.post(
//     `${process.env.DOMAIN}/api/delivery-fee`, // укажи свой порт
//     { userAddress: addressStr }
//   );
//   const { fee, message } = res.data;
//   return {
//     fee: Math.round(fee * 100), // Stripe требует сумму в центах
//     message,
//   };
// }

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
      const size = sizesMap.get(product.sizeId);
      const productExtras = product.extraIds
        .map((extraId) => extrasMap.get(extraId))
        .filter(Boolean);

      if (!flower) throw new Error(`Flower not found: id=${product.id}`);
      if (!size) throw new Error(`Size not found: id=${product.sizeId}`);

      const extrasPrice = productExtras.reduce((sum, e) => sum + e.price, 0);
      const unitTotal = size.price + extrasPrice;

      return {
        title: flower.title + (size.name ? ` (${size.name})` : ''),
        primaryImage: flower.primaryImage,
        price: unitTotal,
        quantity: product.quantity,
        extras: productExtras.map((e) => e.name),
        total: unitTotal * product.quantity,
      };
    });

    // subtotal через reduce
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    // Доставка (через функцию)
    // const { fee: deliveryFee } = await calculateDeliveryFee(address);

    // Налог
    const taxAmount = Math.round(subtotal * 0.07);

    // Stripe line_items
    const line_items = cartItems
      .map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.primaryImage
              ? [`${process.env.DOMAIN}${item.primaryImage}`]
              : [],
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
              description: 'Delivery to address',
            },
            unit_amount: 0,
          },
          quantity: 1,
        },
      ]);

    // Создаём Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/cart`,
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

// ----------------------------------

// ---------- 5. SPA fallback ----------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

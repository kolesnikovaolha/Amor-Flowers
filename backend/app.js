require('dotenv').config();

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

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
      success_url: `${process.env.DOMAIN}/?success=true`,
      cancel_url: `${process.env.DOMAIN}/?canceled=true`,
    });

    // Возвращаем ссылку на оплату
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

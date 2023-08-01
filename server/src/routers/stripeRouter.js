const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
require('dotenv').config();

router.post('/', async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'in-Game-store',
      payment_method: id,
      confirm: true,
    });
    console.log('Payment', payment);
    res.json({
      status: 'success', success: true,
    });
  } catch (error) {
    console.log('===>>> 👉👉👉 file: stripeRouter.js:19 👉👉👉 error', error);
    res.json({
      msg: 'Payment failed',
      success: 'false',
    });
  }
});

module.exports = router;

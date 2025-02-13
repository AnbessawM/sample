const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = { createPaymentIntent };

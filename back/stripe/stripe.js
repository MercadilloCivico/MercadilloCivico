const Stripe = require('stripe');
const { STRIPE_KEY } = require('../config/env.config');

const stripe = new Stripe(STRIPE_KEY);
module.exports = stripe;

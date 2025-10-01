import { loadStripe } from '@stripe/stripe-js';

let stripePromise = null;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.VUE_APP_STRIPE_PUBLISHED_KEY_LIVE);
  }
  return stripePromise;
}

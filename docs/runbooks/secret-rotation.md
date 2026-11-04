# Secret rotation

- `APP_SECRET`: rotating it signs everyone out and invalidates outstanding
  card-update links. Set the new value, restart, and expect support questions
  about expired links.
- `STRIPE_SECRET_KEY`: roll the key in the Stripe dashboard, set the new key,
  restart, then expire the old key in Stripe.
- `STRIPE_WEBHOOK_SECRET`: roll in Stripe (it keeps the old secret valid for a
  window you choose), update, restart.
- Suspected leak: rotate immediately, then review logs for the exposure window.

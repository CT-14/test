# Secret rotation

- `APP_SECRET`: rotating it signs everyone out and invalidates outstanding
  card-update links. Set the new value, restart, and expect support questions
  about expired links. Once M2-01 stores Stripe Connect access tokens encrypted
  with an `APP_SECRET`-derived key, rotation must also re-encrypt those tokens
  (decrypt with the old key, encrypt with the new one) before the old value is
  discarded, or every account has to reconnect Stripe.
- `STRIPE_SECRET_KEY`: roll the key in the Stripe dashboard, set the new key,
  restart, then expire the old key in Stripe.
- `STRIPE_WEBHOOK_SECRET`: roll in Stripe (it keeps the old secret valid for a
  window you choose), update, restart.
- Suspected leak: rotate immediately, then review logs for the exposure window.

# ADR 0004: Stripe Connect for customers, Stripe Billing for our revenue

Status: accepted, 2026-11-04

## Decision

- Customers connect their Stripe accounts with Stripe Connect OAuth (Standard
  accounts, read/write scope needed to create card-update SetupIntents and to
  retry invoices). A Stripe App Marketplace listing follows once approved.
- Connect webhooks deliver customer events to `/webhooks/stripe`, verified
  with the endpoint signing secret, and stored by event id for idempotency.
- Card collection only via Stripe Elements on our hosted page; we never see
  card numbers (keeps us out of PCI DSS card-data scope, SAQ A).
- Our own subscriptions use Stripe Checkout and the customer portal.

## Consequences

Creating the Stripe platform account and enabling Connect is a human action.
All development uses Stripe test mode keys.

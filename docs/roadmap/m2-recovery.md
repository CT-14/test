# M2 Recovery engine

Parent objective: #1. This milestone is the product's core value.

## M2-01 Stripe Connect onboarding

- **Objective:** connect a customer's Stripe account by OAuth (ADR 0004).
- **Requirements:** `/app/connect` starts OAuth with a CSRF `state`; callback stores
  `stripe_account_id` and the encrypted access token (AES-256-GCM, key derived from `APP_SECRET`);
  disconnect deauthorizes in Stripe and deletes the token.
- **Acceptance:** an account can connect, see "connected", and disconnect, in test mode.
- **Dependencies:** M1-03.
- **Tests:** OAuth callback with stubbed Stripe client; state mismatch rejected; token encrypted at rest.

## M2-02 Webhook ingestion

- **Objective:** receive Connect events reliably.
- **Requirements:** `POST /webhooks/stripe` verifies the signature on the raw body; stores event id
  in `stripe_events` (idempotent); handles `invoice.payment_failed`, `invoice.paid`,
  `invoice.marked_uncollectible`, `customer.subscription.deleted`, `account.application.deauthorized`;
  answers 2xx fast and processes in-process.
- **Acceptance:** duplicate deliveries do nothing; bad signatures get 400 and are logged.
- **Dependencies:** M2-01.
- **Tests:** signed fixture events generated with the Stripe SDK's test helper.

## M2-03 Recovery state machine and decline classification

- **Objective:** track each failed invoice from failure to outcome.
- **Requirements:** `recoveries` table (`open`, `recovered`, `lost`) with amount, currency,
  decline code, attribution (`lapsewise` if paid through our card-update page, `assisted` if a
  Stripe retry paid it after an email click, else `stripe`). This is a direct-attribution
  heuristic, not a measured incremental lift: proving incrementality needs a holdout group,
  which is out of scope for M2; classifier mapping Stripe decline codes to `expired_card`,
  `insufficient_funds`, `authentication_required`, `generic`.
- **Acceptance:** the event sequences failed → paid and failed → uncollectible end in the right state.
- **Dependencies:** M2-02.
- **Tests:** table-driven classifier tests; state transition tests.

## M2-04 Email sequences and scheduler

- **Objective:** send the right emails at the right time.
- **Requirements:** `email_steps` table; default sequences per decline class (day 0, 3, 7, final);
  in-process scheduler polling due steps each minute with a lease to avoid double sends; stops on
  recovery; unsubscribe-safe footer; per-account branding (name, logo URL, colour, reply-to).
- **Acceptance:** a recovered invoice cancels pending steps; a crash mid-send does not double-send.
- **Dependencies:** M2-03, M1-01.
- **Tests:** fake clock and console sender drive a full sequence.

## M2-05 Hosted card-update page

- **Objective:** let the end customer update their card in one click.
- **Requirements:** `/u/:token` with a signed, expiring token scoped to one Stripe customer and,
  optionally, one recovery; Stripe Elements with a SetupIntent on the connected account; on
  success set the default payment method and, when the token names a recovery, retry its open
  invoice; customer branding; no card data on our servers.
- **Acceptance:** test-mode card update pays the invoice and marks the recovery `lapsewise`; a
  token without a recovery (pre-dunning, M2-06) updates the card and retries nothing.
- **Dependencies:** M2-04.
- **Tests:** token signing and expiry; handler tests with stubbed Stripe client.

## M2-06 Pre-dunning for expiring cards

- **Objective:** email customers before their card expires.
- **Requirements:** daily job listing active subscriptions whose default card expires this or next
  month; one email per card per month with a customer-scoped card-update link (M2-05, no
  recovery or invoice).
- **Acceptance:** no duplicate emails across days.
- **Dependencies:** M2-03 (and M2-05 for the link).
- **Tests:** job tests with stubbed Stripe list responses.

## M2-07 Recovery dashboard

- **Objective:** show the money.
- **Requirements:** `/app` shows failed, recovered and lost amounts for 30/90 days, recovery rate,
  split by attribution, and a list of open recoveries with their next step.
- **Acceptance:** numbers match the `recoveries` table for seeded data, per currency.
- **Dependencies:** M2-03, M2-05.
- **Tests:** aggregation query tests; HTTP render test.

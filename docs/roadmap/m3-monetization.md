# M3 Monetization

Parent objective: #1. Pricing is a proposal in the business plan section 8 and needs owner approval.

## M3-01 Plans and Stripe Checkout

- **Objective:** customers subscribe to Lapsewise.
- **Requirements:** plan config (Starter, Growth, Scale, monthly and annual price ids from env);
  Checkout session from `/app/billing`; 14-day trial; `plan`, `subscription_status` on `accounts`
  updated by platform webhooks (`checkout.session.completed`, `customer.subscription.*`).
- **Acceptance:** test-mode checkout activates the plan.
- **Dependencies:** M1-03, M2-02 (webhook verification shared).
- **Tests:** webhook-driven plan state tests.

## M3-02 Customer portal and plan enforcement

- **Objective:** self-serve billing and limits.
- **Requirements:** Stripe customer portal link; when a trial ends unpaid or a subscription lapses,
  pause new email sequences (never mid-sequence for an end customer) and show a banner; MRR-tier
  check with a grace period.
- **Acceptance:** lapsed accounts send no new sequences; reactivation resumes.
- **Dependencies:** M3-01, M2-04.
- **Tests:** enforcement tests.

## M3-03 Monthly value report and guarantee credit

- **Objective:** prove value monthly; apply the guarantee if the owner approves it.
- **Requirements:** monthly email to account users with recovered vs fee; when the guarantee is
  enabled and recovered < fee, create a Stripe customer balance credit.
- **Acceptance:** idempotent per account per month.
- **Dependencies:** M3-02, M2-07.
- **Tests:** report computation and idempotency.

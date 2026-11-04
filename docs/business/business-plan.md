# Business plan: Lapsewise

Parent objective: #1. Labels: **[V]** verified, **[R]** reported by third parties,
**[A]** our assumption or estimate. See [opportunity-research.md](opportunity-research.md)
for sources and the alternatives we rejected.

"Lapsewise" is a working name. A trademark and domain availability check is a
human action (see [remaining human actions](../status.md#remaining-human-actions)).

## 1. Product concept

A Stripe app for small subscription businesses that recovers revenue lost to
failed card payments. Connect a Stripe account in two clicks; Lapsewise watches
for failed invoices, emails the customer a branded, decline-reason-aware
sequence with a one-click hosted card-update link, and reports exactly how much
revenue it recovered.

## 2. Target customer

Founders and small teams running B2B or prosumer SaaS on Stripe Billing with
roughly $3k to $50k in monthly recurring revenue (MRR) [A]. They have no
dedicated billing or retention staff and currently rely on Stripe's default
retry and email settings.

## 3. Problem being solved

- Some share of subscription renewals fail on expired, replaced or declined
  cards. Industry vendors commonly cite figures in the range of several
  percent of MRR per month [R]; we treat 3% of MRR at risk per month as our
  planning assumption [A].
- Stripe's built-in recovery is estimated by third parties at 30 to 57% [R].
  Specialist tools claim higher averages (Churn Buster reports 50.3% across
  its customers [R], a vendor figure).
- The specialist tools cost $120 to $270/mo or more [R], which exceeds what a
  $10k MRR business loses per month (3% of $10k = $300 at risk, of which the
  extra recovery over Stripe defaults is a fraction) [A]. Small businesses are
  therefore told to stay on Stripe defaults [R].

## 4. Proposed solution (MVP)

1. Stripe Connect OAuth onboarding; no code changes for the customer.
2. Webhook ingestion of `invoice.payment_failed`, `invoice.paid`,
   `customer.subscription.updated` and `customer.subscription.deleted`.
3. Decline-reason classification (expired card, insufficient funds, generic
   decline, authentication required) choosing an email sequence.
4. Branded email sequences (logo, colour, from-name, reply-to) with sensible
   defaults and editable copy.
5. Hosted, Stripe-Elements-based card-update page linked from every email.
6. Pre-dunning: an email before a card on file expires.
7. Recovery dashboard: failed amount, recovered amount, recovery rate,
   attributed to Lapsewise or to Stripe retries.
8. Self-serve billing for Lapsewise itself through Stripe Checkout and the
   Stripe customer portal.

Out of the MVP: cancellation flows, SMS, in-app paywalls, non-Stripe billing
providers. These are roadmap candidates once revenue validates the core.

## 5. Competitive landscape

| Product            | Price                                     | Notes                                       |
| ------------------ | ----------------------------------------- | ------------------------------------------- |
| Stripe defaults    | Included in Stripe Billing [V]            | Smart Retries, generic emails, card updater |
| Churn Buster       | $269/mo dunning; $430/mo with cancel flows [R] | Flat by MRR tier, month to month        |
| Baremetrics Recover| $129/mo + $49/mo base plan [R]            | Emails only, no retry control [R]           |
| Churnkey           | From $250/mo billed annually [R]          | Cancel flows plus dunning                   |
| Stunning           | From $120/mo [R]                          | Stripe-focused dunning                      |
| Butter, FlyCode    | Share of recovered revenue [R]            | Aimed at larger merchants [A]               |
| Indie tools        | Various low prices [R]                    | Recoverly, Rebounce, RecoverPing, etc. appear in search results; feature depth unknown |

## 6. Differentiation

1. **Price floor below the incumbents** so the product pays for itself at
   $3k MRR [A].
2. **Transparent attribution**: the dashboard separates revenue recovered by
   Lapsewise emails and card updates from revenue Stripe would have recovered
   anyway, so the customer sees honest incremental value [A]. Several
   competitors report a single blended number [A, to verify].
3. **Five-minute setup**: OAuth connect, defaults on, done.
4. **Guarantee**: if recovered revenue is below the subscription fee in a
   month, that month is credited [A, pricing decision for the owner].

Indie competitors exist at similar prices, so differentiation on price alone
is weak. Attribution honesty and setup speed are the main bets; they are
assumptions to validate with the first ten customers.

## 7. Monetization strategy

Monthly SaaS subscription billed through Stripe Billing, 14-day free trial
with the product fully active, so the trial itself proves value in recovered
dollars.

## 8. Pricing model (proposal for owner approval)

| Plan    | Customer MRR covered | Price  | Annual (2 months free) |
| ------- | -------------------- | ------ | ---------------------- |
| Starter | up to $10k           | $29/mo | $290/yr                |
| Growth  | up to $50k           | $69/mo | $690/yr                |
| Scale   | up to $150k          | $149/mo| $1,490/yr              |

Rationale [A]: at $10k MRR with 3% at risk ($300) and an assumed 15 percentage
point improvement over Stripe defaults, Lapsewise adds about $45/mo, above the
$29 Starter price. Growth and Scale stay well below the $120 to $270 entry
prices of the incumbents [R].

Blended average revenue per customer (ARPU) planning assumption: **$50/mo** [A].

## 9. Estimated operating expenses

All figures are monthly, estimates [A], to be confirmed on vendor pricing pages.
Nothing below has been purchased.

| Item                         | 10 customers | 100 customers | 1,000 customers |
| ---------------------------- | -----------: | ------------: | --------------: |
| App hosting (1 small VM / container) | $0 to $5 | $10 | $60 |
| Off-site DB backups (object storage) | $0 | $1 | $10 |
| Transactional email          | $0 (free tier) | $15 | $100 |
| Error monitoring             | $0 (free tier) | $0 | $30 |
| Domain (annualised)          | $2 | $2 | $2 |
| Stripe fees on our revenue (~3.6% incl. Billing) | $18 | $180 | $1,800 |
| Part-time human support and approvals | $0 | $500 | $3,000 |
| **Total**                    | **~$25** | **~$708** | **~$5,000** |

## 10. Customer acquisition strategy

Low or no paid spend, consistent with the issue's financial constraints:

1. Free "failed payment leakage" calculator page: read-only Stripe connect,
   shows how much revenue failed last 90 days and what Stripe recovered.
   This is the main top-of-funnel and also a lead qualifier.
2. Listing in the Stripe App Marketplace (requires Stripe review, human action).
3. Content: practical guides on Stripe dunning settings, decline codes and
   card updater behaviour, targeted at founders searching for these topics.
4. Founder communities (Indie Hackers, relevant subreddits, Hacker News Show HN),
   posted by a human.
5. Integration partnerships with SaaS boilerplates that ship Stripe Billing.
6. Referral credit: one month free for both sides.

## 11. Revenue projections

Assumes $50 ARPU and the cost table above [A].

| Customers | MRR      | ARR       | Monthly costs | Monthly profit | Margin |
| --------: | -------: | --------: | ------------: | -------------: | -----: |
| 10        | $500     | $6,000    | ~$25          | ~$475          | ~95%   |
| 100       | $5,000   | $60,000   | ~$708         | ~$4,292        | ~86%   |
| 1,000     | $50,000  | $600,000  | ~$5,000       | ~$45,000       | ~90%   |

Monthly churn assumption 4% [A]; with $50 ARPU and ~88% gross margin the
lifetime value is about $1,100, so a customer acquisition cost below ~$300 keeps
unit economics comfortably positive [A].

## 12. Key assumptions and business risks

Assumptions to validate first, in order:

1. Small SaaS founders will pay $29 to $69/mo for recovery on top of Stripe
   defaults. **Validation:** ten paying customers within 90 days of launch.
2. Lapsewise can show measurable incremental recovery over Stripe defaults.
   **Validation:** attribution report on the first ten accounts.
3. The leakage calculator converts to trials at 5% or more.

Risks:

- **Stripe improves its built-in recovery** and removes the gap. Mitigation:
  attribution reporting makes the incremental value visible; pivot if it falls
  to zero.
- **Crowded indie segment.** Several low-priced tools already exist [R].
- **Platform dependency** on Stripe Connect and Stripe App review.
- **Email deliverability.** Dunning email that lands in spam recovers nothing.
  Mitigation: per-customer verified sending domains, a reputable provider.
- **Data protection.** We process end-customer emails and billing metadata;
  GDPR and similar laws apply. Mitigation: minimal data retention, DPA
  template, documented subprocessors.
- **Payment card scope.** Card details must only ever be collected by Stripe
  Elements so Lapsewise stays out of PCI DSS card-data scope.

## Pivot triggers

Re-evaluate the opportunity (issue section 8) if any of these hold:

- Fewer than 3 paying customers 90 days after public launch.
- Median incremental recovery over Stripe defaults below the Starter price.
- Stripe ships equivalent branded sequences and attribution in Stripe Billing.

Fallback directions already researched: a broader Stripe revenue toolkit
(pre-dunning plus cancellation flows) for the same audience, or a pivot to
candidate C (feedback boards) where the Stripe-connected audience overlaps.

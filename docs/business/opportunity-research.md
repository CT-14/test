# Opportunity research

Parent objective: #1, build a profitable software business from an empty repository.

Research date: 2026-11-04. Prices were gathered from public web search results
(vendor pages and third-party comparison articles). Many comparison articles are
written by competing vendors, so every figure below is labelled:

- **[V]** verified: consistent across several sources including the vendor's own page.
- **[R]** reported: from one or more third-party sources, not confirmed on the vendor page.
- **[A]** assumption or estimate by us.

Every price must be rechecked on the vendor's own pricing page before it is
quoted to a customer or used in a final pricing decision.

## Selection criteria

From the issue: a real problem, customers who already pay, a low-cost MVP,
minimal ongoing human involvement, recurring revenue, no upfront capital, and
buildable and maintainable by an autonomous engineering organization.

Each candidate is scored 1 to 5 on each criterion (5 is best).

## Candidates

### A. Cron job / heartbeat monitoring

- Market: Cronitor Business is $2 per monitor per month plus $5 per user [V].
  Healthchecks.io is free for 20 checks, $20/mo for 100, $80/mo for 1,000 [V].
  Healthchecks.io is BSD-licensed and self-hostable [V].
- Complaints: per-monitor pricing gets expensive at 50 to 500 jobs [R].
- Gap: price only. Dozens of new entrants already compete on flat pricing
  (CronAlert, FlareWarden, Drumbeats and others) [V: they appear in search results].
- Assessment: very easy to build, which is exactly why the market is crowded
  and prices are falling toward $5/mo. The issue warns against choosing an
  idea because it is easy.

### B. Hosted status pages

- Market: Atlassian Statuspage from $29/mo up to $1,499/mo [R]. Instatus free,
  Pro $15 to $20/mo [R]. Free tiers from Better Stack, UptimeRobot, OpenStatus [R].
  Open source: Uptime Kuma, Cachet, OneUptime [V].
- Complaints: Statuspage pricing scales with subscribers; no built-in monitoring [R].
- Gap: thin. Strong free tiers and open source cap willingness to pay.

### C. Feature voting / feedback boards

- Market: Canny $79 to $579+/mo with tracked-user billing [R]. Frill from $25,
  Nolt from $29, Upvoty from $15, UserJot free to start [R]. Open source:
  Fider, Quackback [R].
- Complaints: tracked-user billing and feature gating [R].
- Gap: already filled by many flat-priced alternatives.

### D. Form backends

- Market: Formspree $10 to $90/mo, Basin $12.50 to $40/mo, Forminit $19/mo [R].
- Gap: commodity. Spam handling is the main operational burden, and it needs
  ongoing human attention.

### E. Failed-payment recovery (dunning) for Stripe subscription businesses

- Market: Churn Buster $269/mo for dunning, flat by MRR tier, entry tier up to
  $150k MRR [R]. Baremetrics Recover $129/mo on top of a $49/mo base plan [R].
  Churnkey from $250/mo billed annually [R]. Stunning from $120/mo [R].
  Butter Payments and FlyCode take a share of recovered revenue [R].
- Built-in alternative: Stripe Billing has Smart Retries and failed-payment
  emails. Third parties estimate it recovers 30 to 57% of failed payments [R].
  A common recommendation is that businesses under about $30k MRR should just
  use Stripe Smart Retries [R].
- Complaints: the paid tools start at $120 to $270/mo, which is more than a
  small SaaS loses per month to failed payments, so small businesses are told
  to stay on Stripe defaults [R].
- Gap: a low-priced tool for businesses with roughly $3k to $50k MRR that adds
  what Stripe defaults lack: branded, decline-reason-aware email sequences, a
  hosted card-update page, and a clear "recovered revenue" report [A].
- Value is directly measurable in dollars, which makes the sale easy to
  justify and makes success-based pricing possible [A].

## Scoring

| Criterion                     | A Cron | B Status | C Feedback | D Forms | E Dunning |
| ----------------------------- | -----: | -------: | ---------: | ------: | --------: |
| Revenue potential             |      2 |        2 |          3 |       2 |         4 |
| Market demand (paying today)  |      4 |        4 |          4 |       3 |         4 |
| Development feasibility       |      5 |        4 |          4 |       5 |         4 |
| Competitive positioning       |      1 |        1 |          2 |       1 |         3 |
| Operating margin              |      4 |        4 |          4 |       3 |         5 |
| Customer acquisition          |      2 |        2 |          2 |       2 |         3 |
| Long-term scalability         |      3 |        3 |          3 |       3 |         4 |
| Low human involvement         |      4 |        4 |          3 |       2 |         4 |
| **Total (of 40)**             | **25** |   **24** |     **25** |  **21** |    **31** |

Scores are our judgment [A], informed by the market data above.

## Decision

Candidate **E, Stripe failed-payment recovery for small SaaS**, is selected.
The full plan is in [business-plan.md](business-plan.md).

Why E over the others:

1. The customer's return is measured in dollars recovered, so pricing can be
   tied to value, and the customer can see the product paying for itself.
2. Incumbents leave the low end (under about $50k MRR) to Stripe defaults
   because their price floor is $120 to $270/mo.
3. It integrates with one platform (Stripe) through OAuth and webhooks, so the
   MVP surface is small and well documented.
4. Once installed it runs unattended: webhooks in, scheduled emails out.

Why not the easier options: A, B, C and D are easier to build but already
have free tiers, open-source equivalents and many flat-priced challengers.
The issue asks us not to choose on ease of implementation.

## What would make us pivot

See "Pivot triggers" in [business-plan.md](business-plan.md#pivot-triggers).

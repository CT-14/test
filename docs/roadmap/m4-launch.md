# M4 Launch readiness

Parent objective: #1.

## M4-01 Terms of service, privacy policy, DPA drafts

- **Objective:** legal drafts for owner and lawyer review (not legal advice).
- **Requirements:** `/terms`, `/privacy`, a DPA template and subprocessor list as Markdown served
  as pages; marked DRAFT until a person approves.
- **Dependencies:** none. **Tests:** pages render.

## M4-02 Marketing site and leakage calculator

- **Objective:** top of funnel (business plan section 10).
- **Requirements:** landing page, pricing page, and a calculator that estimates monthly loss from
  MRR and failure rate without connecting Stripe; read-only Connect version after M2-01.
- **Dependencies:** none for the static calculator. **Tests:** calculator unit tests.

## M4-03 Onboarding flow

- **Objective:** connected and protected in five minutes.
- **Requirements:** checklist (connect Stripe, branding, send test email, review sequence);
  sensible defaults so a connected account is active immediately.
- **Dependencies:** M2-01, M2-04. **Tests:** HTTP tests for checklist state.

## M4-04 Security review

- **Objective:** pre-launch review against OWASP ASVS level 1.
- **Requirements:** review auth, scoping, CSRF, webhook verification, token handling, headers,
  dependency audit (`npm audit`), secret handling; findings filed as tickets.
- **Dependencies:** M2-05, M3-01. **Tests:** any regression tests the findings need.

## M4-05 Support strategy

- **Objective:** low-touch support.
- **Requirements:** docs pages for setup and FAQs, a support email routed to the owner,
  in-app help links, response-time policy in the docs.
- **Dependencies:** none.

## M4-06 Stripe App Marketplace submission package

- **Objective:** prepare the listing for human submission.
- **Requirements:** listing copy, screenshots, permission justifications, review checklist.
- **Dependencies:** M2-07, M4-01. Submission itself is a human action.

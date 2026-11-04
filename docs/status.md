# Status

Last updated: 2026-11-04 by the pull request for #1.

## Summary

| Area                     | State |
| ------------------------ | ----- |
| Selected opportunity     | Stripe failed-payment recovery for small SaaS ("Lapsewise") |
| Business plan            | Drafted: [business/business-plan.md](business/business-plan.md) |
| Architecture and ADRs    | Drafted: [architecture.md](architecture.md), [adr/](adr/) |
| Foundation code          | Config, logging, SQLite migrations, health check, Docker, CI |
| Roadmap                  | 23 tickets in [roadmap/](roadmap/README.md), not yet GitHub issues |
| Implemented features     | None customer-facing |
| Open pull requests       | The foundation PR for #1 |
| Merged                   | Nothing yet |
| Estimated operating cost | ~$25/mo at 10 customers (estimate, business plan section 9) |
| Revenue                  | $0. Not commercially operational. |

## Remaining human actions

Nothing below has been done; each needs owner authorization.

1. Approve or change the product choice, name and pricing (business plan sections 1 and 8).
2. Turn the roadmap tickets into GitHub issues (or allow the factory to create issues).
3. Create a Stripe platform account, enable Connect, and add test mode keys as secrets.
4. Choose and pay for hosting (ADR 0003) and a domain; check trademark availability of the name.
5. Create a transactional email provider account and verify the sending domain (ADR 0005).
6. Create S3-compatible storage for backups (ADR 0002) and an error-reporting account (ADR 0007).
7. Legal review of the terms, privacy policy and DPA drafts (M4-01); business registration.
8. Post in founder communities and submit to the Stripe App Marketplace (M4-06).
9. Review and merge pull requests.

## Business risks

See business plan section 12 and the pivot triggers there.

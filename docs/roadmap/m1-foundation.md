# M1 Foundation

Parent objective: #1. Business plan: [../business/business-plan.md](../business/business-plan.md).

## M1-01 Email sending adapter

- **Objective:** send transactional email through a swappable adapter (ADR 0005).
- **Requirements:** `EmailSender` interface (`send({to, from, replyTo, subject, html, text, tags})`);
  `ConsoleEmailSender` (logs), `PostmarkEmailSender` or `ResendEmailSender` over `fetch`;
  chosen by `EMAIL_PROVIDER` and `EMAIL_API_KEY` env vars, documented in `docs/configuration.md`.
- **Acceptance:** dev and test use the console sender; the HTTP sender maps provider
  errors to a typed error with retryable/permanent classification.
- **Dependencies:** none.
- **Tests:** unit tests with a stubbed `fetch` for success, 4xx (permanent), 5xx (retryable).

## M1-02 Magic-link sign-in and sessions

- **Objective:** passwordless sign-in (ADR 0008).
- **Requirements:** migration for `login_tokens` (hashed, 15-min expiry, single use);
  `POST /login` (always 200, no account enumeration), `GET /login/:token`,
  `POST /logout`; signed `HttpOnly; Secure; SameSite=Lax` cookie; rate limit per email and IP;
  sign-up creates an `accounts` row and first `users` row.
- **Acceptance:** a used or expired token is rejected; sessions survive restart; `/app/*`
  redirects to sign-in when signed out.
- **Dependencies:** M1-01.
- **Tests:** HTTP tests for each path, including replay and expiry with a fake clock.

## M1-03 Dashboard shell

- **Objective:** authenticated server-rendered layout (Hono JSX) with nav and empty states.
- **Requirements:** `/app` overview, `/app/settings`; CSRF protection on all forms; account
  scoping helper that every query uses.
- **Acceptance:** a user cannot read another account's data by changing ids (test proves it).
- **Dependencies:** M1-02.
- **Tests:** HTTP tests for scoping and CSRF rejection.

## M1-04 Error reporting

- **Objective:** report unhandled errors when `SENTRY_DSN` is set (ADR 0007).
- **Requirements:** `@sentry/node` initialised in `server.ts` only when the DSN is set; `onError`
  forwards errors; secrets and emails scrubbed from events.
- **Acceptance:** no network calls without a DSN; scrubber removes `authorization`, `cookie`, emails.
- **Dependencies:** none.
- **Tests:** unit test for the scrubber.

## M1-05 Request logging and request ids

- **Objective:** one log line per request with method, path, status, duration, request id.
- **Requirements:** honour or generate `x-request-id`; never log query strings on `/u/*` or `/login/*`.
- **Acceptance:** token-bearing paths are redacted in logs.
- **Dependencies:** none.
- **Tests:** HTTP test capturing logger output.

## M1-06 Deploy pipeline

- **Objective:** deploy on merge to `main` to the host the owner approves (ADR 0003).
- **Requirements:** build and push the image to GHCR tagged with the SHA; deploy job gated on a
  repository secret so it is a no-op until configured; post-deploy `/healthz` check.
- **Acceptance:** a merge produces a running SHA-tagged release; failure keeps the old one.
- **Dependencies:** owner approval of a host (human action).
- **Tests:** workflow lint (`actionlint`) in CI.

## M1-07 Litestream backups

- **Objective:** continuous SQLite backup (ADR 0002).
- **Requirements:** Litestream in the image as the process supervisor (`litestream replicate -exec`),
  configured by `LITESTREAM_REPLICA_URL`; disabled when unset; restore on boot when the db is missing.
- **Acceptance:** runbook [backup-restore.md](../runbooks/backup-restore.md) steps work against MinIO in CI.
- **Dependencies:** M1-06.
- **Tests:** CI job that writes, kills, restores and compares row counts.

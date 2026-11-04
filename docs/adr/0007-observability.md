# ADR 0007: Logs, health checks, error reporting

Status: accepted, 2026-11-04

## Decision

- Structured JSON logs to stdout (one object per line, `level`, `msg`, `time`).
- `GET /healthz` checks the database and returns 200 or 503.
- Unhandled errors reported to a Sentry-compatible DSN when `SENTRY_DSN` is set
  (Sentry free tier or self-hosted GlitchTip).
- External uptime monitoring of `/healthz` with a free monitor.

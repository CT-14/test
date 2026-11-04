# Architecture

The product is described in [business/business-plan.md](business/business-plan.md).
Decisions and their reasons are recorded as ADRs in [adr/](adr/).

## Goals

Simple to operate by an autonomous team, cheap to run, secure by default,
and no card data ever touches our servers.

## Overview

```text
             Stripe (customer accounts, via Connect OAuth)
                 │  webhooks                ▲ API calls
                 ▼                          │
  ┌────────────────────────────────────────────────────┐
  │ lapsewise (one Node.js process, one container)     │
  │                                                    │
  │  HTTP (Hono)        Scheduler (in-process)         │
  │   /healthz           due email steps every minute  │
  │   /webhooks/stripe                                 │
  │   /app/* dashboard   Email adapter ──► provider API │
  │   /u/:token card update page (Stripe Elements)     │
  │                                                    │
  │  SQLite (node:sqlite, WAL)  ◄── Litestream ──► object storage
  └────────────────────────────────────────────────────┘
```

## Components

| Component      | Choice                                   | ADR |
| -------------- | ---------------------------------------- | --- |
| Language       | TypeScript on Node.js 24 LTS             | [0001](adr/0001-typescript-node.md) |
| HTTP framework | Hono with `@hono/node-server`            | [0001](adr/0001-typescript-node.md) |
| Database       | SQLite via built-in `node:sqlite`, WAL mode, SQL migrations | [0002](adr/0002-sqlite.md) |
| Backups        | Litestream replication to S3-compatible storage | [0002](adr/0002-sqlite.md) |
| Hosting        | One container on a small VM or PaaS with a persistent volume | [0003](adr/0003-hosting.md) |
| Payments       | Stripe Connect (customers), Stripe Billing (our own revenue) | [0004](adr/0004-stripe.md) |
| Email          | Provider-agnostic adapter; Postmark or Resend recommended | [0005](adr/0005-email.md) |
| Testing        | Vitest                                   | [0006](adr/0006-tooling.md) |
| Lint / format  | Biome                                    | [0006](adr/0006-tooling.md) |
| CI/CD          | GitHub Actions                           | [0006](adr/0006-tooling.md) |
| Observability  | JSON logs to stdout, `/healthz`, Sentry-compatible error reporting | [0007](adr/0007-observability.md) |
| Auth           | Email magic links, signed session cookies | [0008](adr/0008-auth.md) |

## Source layout

```text
src/
  config.ts     environment parsing and validation (zod)
  logger.ts     structured JSON logger
  db.ts         SQLite connection and migration runner
  app.ts        Hono app factory (routes are mounted here)
  server.ts     process entry point
migrations/     numbered .sql files, applied in order, never edited after merge
test/           Vitest tests
docs/           business, architecture, ADRs, runbooks, roadmap
```

## Data model (planned, delivered by roadmap tickets)

- `accounts`: a Lapsewise customer (one Stripe connected account each).
- `users`: people who sign in to an account.
- `stripe_events`: received webhook event ids for idempotency.
- `recoveries`: one per failed invoice; state machine
  `open → recovered | lost`, with attribution `lapsewise | stripe`.
- `email_steps`: scheduled and sent emails for a recovery.
- `settings`: branding and sequence configuration per account.

## Security principles

- Card data is only ever entered into Stripe Elements; we store Stripe ids.
- Every webhook is verified with the Stripe signature before parsing.
- Stripe Connect access tokens are encrypted at rest with `APP_SECRET`-derived keys.
- Card-update links use single-purpose, expiring, signed tokens.
- Secrets come only from the environment; see [configuration.md](configuration.md).

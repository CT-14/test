# ADR 0001: TypeScript on Node.js with Hono

Status: accepted, 2026-11-04

## Context

One small team (largely autonomous agents) builds and maintains a web app
that talks to Stripe and serves a dashboard. Stripe's best maintained SDK
and Elements are JavaScript.

## Decision

TypeScript (strict) on Node.js 24 LTS. HTTP with Hono on `@hono/node-server`,
server-rendered HTML for the dashboard (Hono JSX), no SPA build step.

## Consequences

- One language for server, templates and Stripe Elements glue.
- Hono is small and standards-based (Fetch `Request`/`Response`), so handlers are
  testable with `app.request()` without opening sockets.
- No frontend bundler to maintain. If richer UI is needed later, add islands.

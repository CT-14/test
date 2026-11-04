# Development

## Setup

1. Install Node.js 24 (`nvm use` reads `.nvmrc`).
2. `npm ci`
3. `cp .env.example .env` and set `APP_SECRET` to 32+ random characters
   (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
4. `node --env-file=.env --import tsx src/server.ts`, or export the variables and `npm run dev`.

## Before every pull request

`npm run check` runs lint, typecheck and tests; CI runs the same plus a build
and a Docker build. `npm run format` fixes formatting.

## Conventions

- One ticket, one branch, one pull request; tickets live in [roadmap/](roadmap/).
- Migrations: add `migrations/NNNN_description.sql`; never edit a merged one.
- Tests sit in `test/` and use in-memory SQLite and `app.request()`; no network.
- Stripe work uses test mode keys and the Stripe CLI (`stripe listen
  --forward-to localhost:3000/webhooks/stripe`) for webhooks.
- Record significant technical choices as a new ADR in [adr/](adr/).

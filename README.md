# Lapsewise

Failed-payment recovery for small Stripe subscription businesses. Connect a
Stripe account; Lapsewise emails customers whose renewals failed with a
branded, decline-aware sequence and a hosted card-update link, and reports
how much revenue it recovered.

Status: **foundation only**. No customer-facing feature is built yet. See
[docs/status.md](docs/status.md) for progress and the work that needs a person.

## Quick start

Requires Node.js 24 (see `.nvmrc`).

```sh
npm ci
cp .env.example .env   # then set APP_SECRET
npm run dev            # http://localhost:3000/healthz
```

`npm run dev` does not read `.env` by itself; export the variables or run
`node --env-file=.env --import tsx src/server.ts`.

## Commands

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Run with reload                       |
| `npm test`          | Vitest test suite                     |
| `npm run lint`      | Biome lint and format check           |
| `npm run typecheck` | TypeScript strict typecheck           |
| `npm run check`     | All three; CI runs the same           |
| `npm run build`     | Compile to `dist/`                    |

## Documentation

- Business: [opportunity research](docs/business/opportunity-research.md), [business plan](docs/business/business-plan.md)
- Engineering: [architecture](docs/architecture.md), [decisions (ADRs)](docs/adr/), [development](docs/development.md), [configuration](docs/configuration.md), [deployment](docs/deployment.md)
- Operations: [runbooks](docs/runbooks/)
- Planning: [roadmap and tickets](docs/roadmap/README.md), [status](docs/status.md)

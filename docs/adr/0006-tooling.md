# ADR 0006: Vitest, Biome, GitHub Actions

Status: accepted, 2026-11-04

## Decision

- Tests: Vitest. Unit tests per module; HTTP tests through `app.request()`;
  SQLite tests against in-memory databases.
- Lint and format: Biome (one fast tool, one config).
- Typecheck: `tsc --noEmit` in strict mode.
- CI: GitHub Actions runs `npm ci`, lint, typecheck, test, and a Docker build
  on every pull request and on `main`.
- CD: deploy on push to `main` once a host is chosen (roadmap ticket); until
  then deployment is manual, see [deployment.md](../deployment.md).

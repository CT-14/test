# ADR 0002: SQLite with Litestream backups

Status: accepted, 2026-11-04

## Context

Expected load at 1,000 customers is low (webhooks and a few emails per failed
invoice). The main cost and risk drivers are operations, not throughput.

## Decision

SQLite through Node's built-in `node:sqlite` module in WAL mode, plain SQL
migrations in `migrations/`, applied at start-up in filename order and recorded
in `schema_migrations`. Continuous backup with Litestream to S3-compatible
object storage.

## Consequences

- No database server to run, patch or pay for; no native npm dependency.
- One writer process: the app runs as a single instance. Horizontal scaling
  would require moving to Postgres; the SQL is kept portable to make that
  a contained change.
- `node:sqlite` is marked experimental in some Node versions; we pin Node 24
  in CI and the container.
- Restore procedure is in [runbooks/backup-restore.md](../runbooks/backup-restore.md).

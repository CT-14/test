# App down or `/healthz` failing

1. `curl -i https://<host>/healthz`. A 503 means the process is up but the
   database is not answering; no response means the process or host is down.
2. Read the latest logs (JSON lines). Look for `"level":"error"` and for a
   `Invalid configuration` or `Migration ... failed` message at start-up.
3. Configuration error: fix the named variable in the host's secrets, restart.
4. Migration failure: the migration was rolled back. Roll back to the previous
   image ([release-rollback.md](release-rollback.md)) and fix the migration in a PR.
5. Disk full on `/data`: grow the volume; check WAL size (`lapsewise.db-wal`).
6. Corrupt database: stop the app and restore ([backup-restore.md](backup-restore.md)).
7. After recovery, check that Stripe webhooks are delivered again (Stripe
   dashboard, Developers, Webhooks); Stripe retries failed deliveries for up to
   three days, and handlers are idempotent by event id.

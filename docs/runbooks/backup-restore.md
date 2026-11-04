# Backup and restore

Backups use Litestream continuous replication of `/data/lapsewise.db` to
S3-compatible storage (set up by roadmap ticket M1-07).

## Verify (monthly)

1. `litestream restore -o /tmp/verify.db <replica-url>`
2. `sqlite3 /tmp/verify.db "PRAGMA integrity_check; SELECT count(*) FROM accounts;"`

## Restore

1. Stop the app (single writer).
2. Move the current file aside: `mv /data/lapsewise.db /data/lapsewise.db.broken`
   (and its `-wal` and `-shm` files).
3. `litestream restore -o /data/lapsewise.db <replica-url>`
   (add `-timestamp <RFC3339>` for point-in-time).
4. Start the app; confirm `/healthz` returns 200.
5. Stripe webhooks missed during the outage are redelivered by Stripe.

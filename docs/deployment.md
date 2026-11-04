# Deployment

The app ships as one Docker image (`Dockerfile`) and runs as **one instance**
with a persistent volume mounted at `/data` (SQLite, see ADR 0002).

No host has been chosen or paid for yet; that needs owner approval
(see [status.md](status.md#remaining-human-actions)).

## Generic steps

1. `docker build -t lapsewise .`
2. Create a persistent volume (1 GB is plenty initially) mounted at `/data`.
3. Set the variables from [configuration.md](configuration.md) as secrets;
   at minimum `APP_SECRET`, `APP_URL`, `NODE_ENV=production`.
4. `docker run -d -p 3000:3000 -v lapsewise-data:/data --env-file prod.env lapsewise`
5. Put TLS in front (platform TLS, or Caddy on a VPS).
6. Point an uptime monitor at `https://<host>/healthz`.
7. Configure Litestream backups ([runbooks/backup-restore.md](runbooks/backup-restore.md)).

Migrations run automatically at start-up. Because there is a single writer,
deploy with stop-then-start (no overlapping instances against the same volume).

## Continuous deployment

CI builds the image on every pull request. Automatic deploy on merge to
`main` is roadmap ticket M1-06, once a host is approved.

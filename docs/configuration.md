# Environment configuration

All configuration comes from environment variables, validated at start-up by
`src/config.ts`; the process exits with a message naming any invalid variable.

| Variable                  | Required | Default                  | Purpose |
| ------------------------- | -------- | ------------------------ | ------- |
| `NODE_ENV`                | no       | `development`            | `development`, `test` or `production` |
| `PORT`                    | no       | `3000`                   | HTTP port |
| `DATABASE_PATH`           | no       | `./data/lapsewise.db`    | SQLite file (`/data/lapsewise.db` in the container) |
| `APP_URL`                 | no       | `http://localhost:3000`  | Public base URL for links |
| `APP_SECRET`              | **yes**  |                          | 32+ chars; signs sessions and links |
| `LOG_LEVEL`               | no       | `info`                   | `debug`, `info`, `warn`, `error` |
| `STRIPE_SECRET_KEY`       | later    |                          | Platform secret key; a `sk_test_` key is rejected in production |
| `STRIPE_WEBHOOK_SECRET`   | later    |                          | Connect webhook signing secret |
| `STRIPE_CONNECT_CLIENT_ID`| later    |                          | Connect OAuth client id |
| `SENTRY_DSN`              | no       |                          | Error reporting |

"Later" variables become required when the Stripe tickets land.
Secrets are set in the host's secret store, never committed.

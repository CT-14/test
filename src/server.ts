import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { loadConfig } from "./config.js";
import { migrate, openDatabase } from "./db.js";
import { createLogger } from "./logger.js";

const config = loadConfig();
const logger = createLogger(config.LOG_LEVEL);
const db = openDatabase(config.DATABASE_PATH);
const applied = migrate(db);
if (applied.length > 0) logger.info("migrations applied", { applied });

const server = serve(
  { fetch: createApp({ db, logger }).fetch, port: config.PORT },
  (info) => logger.info("listening", { port: info.port }),
);

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    logger.info("shutting down", { signal });
    server.close(() => {
      db.close();
      process.exit(0);
    });
  });
}

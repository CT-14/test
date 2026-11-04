import type { DatabaseSync } from "node:sqlite";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import type { Logger } from "./logger.js";

export interface AppDeps {
  db: DatabaseSync;
  logger: Logger;
}

export function createApp({ db, logger }: AppDeps): Hono {
  const app = new Hono();

  app.use(secureHeaders());

  app.get("/healthz", (c) => {
    try {
      db.prepare("SELECT 1").get();
      return c.json({ status: "ok" });
    } catch (error) {
      logger.error("health check failed", { error: (error as Error).message });
      return c.json({ status: "error" }, 503);
    }
  });

  app.get("/", (c) => c.text("Lapsewise: recover failed Stripe payments."));

  app.notFound((c) => c.json({ error: "not_found" }, 404));

  app.onError((error, c) => {
    logger.error("unhandled error", { error: error.message, path: c.req.path });
    return c.json({ error: "internal_error" }, 500);
  });

  return app;
}

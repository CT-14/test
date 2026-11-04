import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { migrate, openDatabase } from "../src/db.js";
import { createLogger } from "../src/logger.js";

function setup() {
  const db = openDatabase(":memory:");
  migrate(db);
  return {
    db,
    app: createApp({ db, logger: createLogger("error", () => {}) }),
  };
}

describe("app", () => {
  it("reports healthy when the database answers", async () => {
    const res = await setup().app.request("/healthz");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok" });
  });

  it("reports unhealthy when the database is closed", async () => {
    const { db, app } = setup();
    db.close();
    expect((await app.request("/healthz")).status).toBe(503);
  });

  it("sets security headers", async () => {
    const res = await setup().app.request("/");
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
  });

  it("returns JSON 404 for unknown routes", async () => {
    const res = await setup().app.request("/nope");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
  });
});

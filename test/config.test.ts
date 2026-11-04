import { describe, expect, it } from "vitest";
import { ConfigError, loadConfig } from "../src/config.js";

const secret = "x".repeat(32);

describe("loadConfig", () => {
  it("applies defaults when only APP_SECRET is set", () => {
    const config = loadConfig({ APP_SECRET: secret });
    expect(config.PORT).toBe(3000);
    expect(config.NODE_ENV).toBe("development");
    expect(config.STRIPE_SECRET_KEY).toBeUndefined();
  });

  it("treats empty optional values as unset", () => {
    expect(
      loadConfig({ APP_SECRET: secret, SENTRY_DSN: "" }).SENTRY_DSN,
    ).toBeUndefined();
  });

  it("rejects a short APP_SECRET", () => {
    expect(() => loadConfig({ APP_SECRET: "short" })).toThrow(/APP_SECRET/);
  });

  it("rejects a Stripe test key in production", () => {
    expect(() =>
      loadConfig({
        APP_SECRET: secret,
        NODE_ENV: "production",
        STRIPE_SECRET_KEY: "sk_test_1",
      }),
    ).toThrow(ConfigError);
  });
});

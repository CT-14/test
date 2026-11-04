import { z } from "zod";

const optional = z
  .string()
  .optional()
  .transform((value) => (value === "" ? undefined : value));

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_PATH: z.string().min(1).default("./data/lapsewise.db"),
  APP_URL: z.url().default("http://localhost:3000"),
  APP_SECRET: z.string().min(32, "APP_SECRET must be at least 32 characters"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  STRIPE_SECRET_KEY: optional,
  STRIPE_WEBHOOK_SECRET: optional,
  STRIPE_CONNECT_CLIENT_ID: optional,
  SENTRY_DSN: optional,
});

export type Config = z.infer<typeof schema>;

export class ConfigError extends Error {}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const result = schema.safeParse(env);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new ConfigError(`Invalid configuration: ${problems}`);
  }
  const config = result.data;
  if (
    config.NODE_ENV === "production" &&
    config.STRIPE_SECRET_KEY?.startsWith("sk_test_")
  ) {
    throw new ConfigError(
      "Invalid configuration: STRIPE_SECRET_KEY is a test key in production",
    );
  }
  return config;
}

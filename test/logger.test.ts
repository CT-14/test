import { describe, expect, it } from "vitest";
import { createLogger } from "../src/logger.js";

describe("createLogger", () => {
  it("writes one JSON object per line with fields", () => {
    const lines: string[] = [];
    createLogger("info", (line) => lines.push(line)).info("hello", { id: 7 });
    expect(JSON.parse(lines[0] ?? "")).toMatchObject({
      level: "info",
      msg: "hello",
      id: 7,
    });
  });

  it("drops messages below the configured level", () => {
    const lines: string[] = [];
    const logger = createLogger("warn", (line) => lines.push(line));
    logger.info("ignored");
    logger.error("kept");
    expect(lines).toHaveLength(1);
  });

  it("keeps its own metadata when fields use the same keys", () => {
    const lines: string[] = [];
    createLogger("info", (line) => lines.push(line)).error("failed", {
      level: "info",
      msg: undefined,
      time: "x",
    });
    const record = JSON.parse(lines[0] ?? "");
    expect(record).toMatchObject({ level: "error", msg: "failed" });
    expect(record.time).not.toBe("x");
  });
});

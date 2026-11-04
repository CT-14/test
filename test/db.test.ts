import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { migrate, openDatabase } from "../src/db.js";

describe("migrate", () => {
  it("applies the bundled migrations once", () => {
    const db = openDatabase(":memory:");
    expect(migrate(db)).toContain("0001_init.sql");
    expect(migrate(db)).toEqual([]);
    db.prepare("INSERT INTO accounts (id, name) VALUES (?, ?)").run(
      "acc_1",
      "Acme",
    );
    expect(db.prepare("SELECT name FROM accounts").get()).toEqual({
      name: "Acme",
    });
  });

  it("rolls back a failing migration and reports its name", () => {
    const dir = mkdtempSync(join(tmpdir(), "lapsewise-migrations-"));
    writeFileSync(join(dir, "0001_ok.sql"), "CREATE TABLE a (id INTEGER);");
    writeFileSync(
      join(dir, "0002_bad.sql"),
      "CREATE TABLE b (id INTEGER); NOT SQL;",
    );
    const db = openDatabase(":memory:");
    expect(() => migrate(db, dir)).toThrow(/0002_bad\.sql/);
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
      .all()
      .map((row) => row.name);
    expect(tables).toContain("a");
    expect(tables).not.toContain("b");
  });
});

import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

export const defaultMigrationsDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "migrations",
);

export function openDatabase(path: string): DatabaseSync {
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(
    "PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;",
  );
  return db;
}

/** Applies every not-yet-applied `NNNN_name.sql` file in order. Returns the names applied. */
export function migrate(
  db: DatabaseSync,
  dir: string = defaultMigrationsDir,
): string[] {
  db.exec(
    "CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL)",
  );
  const applied = new Set(
    db
      .prepare("SELECT name FROM schema_migrations")
      .all()
      .map((row) => String(row.name)),
  );
  const pending = readdirSync(dir)
    .filter((file) => /^\d{4}_[\w-]+\.sql$/.test(file) && !applied.has(file))
    .sort();
  for (const file of pending) {
    const sql = readFileSync(join(dir, file), "utf8");
    db.exec("BEGIN");
    try {
      db.exec(sql);
      db.prepare(
        "INSERT INTO schema_migrations (name, applied_at) VALUES (?, ?)",
      ).run(file, new Date().toISOString());
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw new Error(`Migration ${file} failed: ${(error as Error).message}`);
    }
  }
  return pending;
}

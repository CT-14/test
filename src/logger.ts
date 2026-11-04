export type LogLevel = "debug" | "info" | "warn" | "error";

const order: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export type Logger = Record<
  LogLevel,
  (msg: string, fields?: Record<string, unknown>) => void
>;

export function createLogger(
  level: LogLevel = "info",
  write: (line: string) => void = (line) => process.stdout.write(`${line}\n`),
): Logger {
  const log =
    (at: LogLevel) =>
    (msg: string, fields: Record<string, unknown> = {}) => {
      if (order[at] < order[level]) return;
      write(
        JSON.stringify({
          time: new Date().toISOString(),
          level: at,
          msg,
          ...fields,
        }),
      );
    };
  return {
    debug: log("debug"),
    info: log("info"),
    warn: log("warn"),
    error: log("error"),
  };
}

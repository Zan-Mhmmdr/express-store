type LogLevel = "info" | "warn" | "error" | "debug";

const formatMessage = (level: LogLevel, message: string) => {
  const time = new Date().toISOString();
  return `[${time}] [${level.toUpperCase()}] ${message}`;
};

export const logger = {
  info(message: string) {
    console.log(formatMessage("info", message));
  },

  warn(message: string) {
    console.warn(formatMessage("warn", message));
  },

  error(message: string) {
    console.error(formatMessage("error", message));
  },

  debug(message: string) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(formatMessage("debug", message));
    }
  },
};

export default logger;
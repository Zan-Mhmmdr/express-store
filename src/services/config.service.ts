import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];

  if (!value && defaultValue === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value || defaultValue!;
};

export const config = {
  port: Number(getEnv("PORT", "3000")),

  smtp: {
    host: getEnv("SMTP_HOST", "smtp.gmail.com"),
    user: getEnv("SMTP_USER", ""),
    pass: getEnv("SMTP_PASS", ""),
  },
};

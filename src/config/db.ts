import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "express_store",
  port: Number(process.env.DB_PORT) || 3306,
});
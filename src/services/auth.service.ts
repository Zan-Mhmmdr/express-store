import { hash } from "bcrypt";
import { db } from "../config/db";

const bcrypt = require("bcrypt");

export const registerUser = async (data: any) => {
  const hashedPassword = bcrypt.hash(data.password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const [result] = await db.execute(sql, [
    data.name,
    data.email,
    hashedPassword,
  ]);
  return result;
};

export const loginUser = async (email: string, password: string) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows]: any = await db.execute(sql, [email]);
  if (rows.length === 0) {
    throw new Error("Invalid email or password");
  }
  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return { id: user.id, email: user.email };
};

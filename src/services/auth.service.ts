import { hash } from "bcrypt";
import { db } from "../config/db";

const bcrypt = require("bcrypt");

export const registerUser = async (data: any) => {
  const hashedPassword = bcrypt.hash(data.password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const [result] = await db.execute(sql, [data.name, data.email, hashedPassword]);
  return result;
};

export const loginUser = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return { message: "Login successful" };
};

import bcrypt from "bcryptjs";
import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

export const register = async (data: any) => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";

  const [result] = await db.execute(sql, [username, email, hashedPassword]);

  console.log("User registered with ID:", (result as any).insertId);
  return result;
};

export const login = async (data: any) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const { email, password } = data;
  const [rows] = await db.execute<RowDataPacket[]>(sql, [email]);

  if (rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = rows[0];
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  return { id: user.id, username: user.username, email: user.email };
};
import bcrypt from "bcryptjs";
import { db } from "../config/db";

export const register = async (data: any) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10);

  const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";

  const [result] = await db.execute(sql, [
    data.username,
    data.email,
    hashedPassword,
  ]);
  return result;
};

export const login = async (data: any) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const { email, password } = data;
  const [rows]: any = await db.execute(sql, [email]);

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

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    // cek email sudah ada belum
    const [existing]: any = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      throw new Error("Email already registered");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return { message: "Register success" };
  }

  static async login(email: string, password: string) {
    const [users]: any = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      throw new Error("Email not found");
    }

    const user = users[0];

    // compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Wrong password");
    }

    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return {
      message: "Login success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

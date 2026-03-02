import { login, register } from "../service/auth.service";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const registerAuth = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await register(data);
    res.status(201).json({
      message: "User registered successfully",
      userId: (result as any).insertId,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginAuth = async (req: Request, res: Response) => {
  try {
    const user = await login(req.body);

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err: unknown) {
    const error = err as Error
    console.error("Login error:", error);
    res.status(401).json({ message: error.message });
  }
};

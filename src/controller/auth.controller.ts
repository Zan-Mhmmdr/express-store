import { login, register } from "../service/auth.service";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const registerAuth = async (req: Request, res: Response) => {
  const data = req.body;
  await register(data);
  res.send("User registered successfully");
};

export const loginAuth = async (req: Request, res: Response) => {
  try {
    const user = await login(req.body);

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
  } catch (err) {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

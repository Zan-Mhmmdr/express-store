import { Request, Response } from "express";
import { getUserById } from "../service/user.service";

export const profile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await getUserById(userId);

    res.json({
      message: "User profile",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

import { Request, Response } from "express";
import { getUserById, updateUserProfile } from "../service/user.service";

export const profile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await getUserById(userId);

    res.json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const data = req.body;

    await updateUserProfile(userId, data);

    res.json({
      message: "User profile updated successfully",
      updateUserProfile,
    });
    
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile" });
  }
};

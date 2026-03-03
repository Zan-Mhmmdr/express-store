import { Request, Response } from "express";
import {
  deleteUserProfile,
  getUserById,
  updateUserPassword,
  updateUserProfile,
} from "../service/user.service";

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
      data: updateUserProfile,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile" });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const data = req.body;

    const result = await updateUserPassword(userId, data);

    res.json({
      message: "User password updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user password" });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

  const result = await deleteUserProfile(userId);
    res.json({
      message: "User profile deleted successfully",
      data: result,
    });

  } catch (err) {
    res.status(500).json({ message: "Error deleting user profile" });
  }
};

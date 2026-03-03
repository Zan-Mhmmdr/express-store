import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { deleteProfile, profile, updatePassword, updateProfile } from "../controller/user.controller";

const UserRoutes = Router();

UserRoutes.get("/me", authMiddleware, profile);
UserRoutes.put("/me", authMiddleware, updateProfile)
UserRoutes.patch("/me", authMiddleware, updatePassword)
UserRoutes.delete("/me", authMiddleware, deleteProfile)

export default UserRoutes;

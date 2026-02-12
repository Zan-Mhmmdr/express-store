import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { profile } from "../controller/user.controller";

const UserRoutes = Router();

UserRoutes.get("/me", authMiddleware, profile);

export default UserRoutes;

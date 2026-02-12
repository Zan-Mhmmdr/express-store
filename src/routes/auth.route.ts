import { Router } from "express";
import { registerAuth, loginAuth } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerAuth);
authRoutes.post("/login", loginAuth);

export default authRoutes;
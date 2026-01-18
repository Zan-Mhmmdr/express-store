import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

// GET all users
router.get("/", userController.getUsers);

// GET user by id
router.get("/:id", userController.getUserById);

// CREATE user
router.post("/", userController.createUser);

// UPDATE user
router.put("/:id", userController.updateUser);

// DELETE user
router.delete("/:id", userController.deleteUser);

export default router;

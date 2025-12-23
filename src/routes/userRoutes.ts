import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController';

export const app = express();

app.get("/users", getUsers);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);
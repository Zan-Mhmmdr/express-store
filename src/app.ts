import express from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

import { getUsers } from "./controllers/userController";

app.get("/users", getUsers);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

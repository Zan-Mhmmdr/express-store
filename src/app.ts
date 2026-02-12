import express from "express";
import authRoutes from "./routes/auth.route";
import UserRoutes from "./routes/user.route";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/users", UserRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;

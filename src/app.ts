import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import UserRoutes from "./routes/user.route";
import { db } from "./config/db";
import productRoutes from "./routes/product.route";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

db.getConnection()
  .then((conn) => {
    console.log("DB Connected");
    conn.release();
  })
  .catch((err) => {
    console.error("DB ERROR:", err);
  });
 
app.use("/api/auth", authRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;

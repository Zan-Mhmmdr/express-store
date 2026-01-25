import { db } from "../config/db";

export const createProduct = async (
  name: string,
  price: number,
  stock: number
) => {
  const [result]: any = await db.query(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock]
  );

  return {
    id: result.insertId,
    name,
    price,
    stock,
  };
};

export const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

export const getProductById = async (id: number) => {
  const [rows]: any = await db.query(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const updateProduct = async (
  id: number,
  name: string,
  price: number,
  stock: number
) => {
  await db.query(
    "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
    [name, price, stock, id]
  );

  return { message: "Product updated" };
};

export const deleteProduct = async (id: number) => {
  await db.query("DELETE FROM products WHERE id = ?", [id]);
  return { message: "Product deleted" };
};

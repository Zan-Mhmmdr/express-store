import e from "express";
import { db } from "../config/db";

export const createProductService = async (data: any) => {
  const { name, description, price, stock } = data;

  if (!name || price === undefined) {
    throw new Error("Name dan price wajib diisi");
  }

  const sql =
    "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)";

  const [result] = await db.execute(sql, [name, description, price, stock]);

  return result;
};

export const getProductsService = async () => {
  const sql = "SELECT * FROM products";

  const [rows] = await db.execute(sql);

  return rows;
};

export const getProductByIdService = async (id: any) => {
  const sql = "SELECT * FROM products WHERE id = ?";

  const [rows] = await db.execute(sql, [id]);

  return rows;
};

import { db } from "../config/db";

export const createCategory = async (name: string) => {
  const [result]: any = await db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name]
  );

  return {
    id: result.insertId,
    name,
  };
};

export const getAllCategories = async () => {
  const [rows] = await db.query("SELECT * FROM categories");
  return rows;
};

export const getCategoryById = async (id: number) => {
  const [rows]: any = await db.query(
    "SELECT * FROM categories WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const updateCategory = async (id: number, name: string) => {
  await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
  return { message: "Category updated" };
};

export const deleteCategory = async (id: number) => {
  await db.query("DELETE FROM categories WHERE id = ?", [id]);
  return { message: "Category deleted" };
};

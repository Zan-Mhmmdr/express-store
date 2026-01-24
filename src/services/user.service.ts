import { db } from "../config/db";

export const getAllUsers = async () => {
  const [rows] = await db.query("SELECT id, name, email FROM users");
  return rows;
};

export const getUserById = async (id: number) => {
  const [rows]: any = await db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const updateUser = async (id: number, name: string, email: string) => {
  await db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id]
  );

  return { message: "User updated" };
};

export const deleteUser = async (id: number) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
  return { message: "User deleted" };
};

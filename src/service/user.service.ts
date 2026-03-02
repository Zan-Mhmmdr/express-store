import { db } from "../config/db";

interface user {
  id: number;
  username: string;
  email: string;
}

export const getUserById = async (userId: number): Promise<user> => {
  const sql = "SELECT id, username, email FROM users WHERE id = ?";

  const [rows]: any = await db.execute(sql, [userId]);

  if (rows.lengts === 0) {
    throw new Error("User not found");
  }

  return rows[0];
};

export const updateUserProfile = async (userId: number, data: any) => {
  const { username, email} = data;

  const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";

  const [rows]:any =  await db.execute(sql, [username, email, userId]);

  if (rows.affectedRows === 0) {
    throw new Error("User not found or no changes made");
  }

  return rows[0];
}
import { db } from "../config/db";

export const addToCart = async (
  userId: number,
  productId: number,
  qty: number
) => {
  // cek sudah ada di cart belum
  const [rows]: any = await db.query(
    "SELECT * FROM carts WHERE user_id = ? AND product_id = ?",
    [userId, productId]
  );

  if (rows.length > 0) {
    // kalau sudah ada → update qty
    await db.query(
      "UPDATE carts SET qty = qty + ? WHERE id = ?",
      [qty, rows[0].id]
    );
  } else {
    // kalau belum ada → insert
    await db.query(
      "INSERT INTO carts (user_id, product_id, qty) VALUES (?, ?, ?)",
      [userId, productId, qty]
    );
  }

  return { message: "Added to cart" };
};

export const getUserCart = async (userId: number) => {
  const [rows] = await db.query(`
    SELECT c.id, p.name, p.price, c.qty
    FROM carts c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `, [userId]);

  return rows;
};

export const removeFromCart = async (cartId: number) => {
  await db.query("DELETE FROM carts WHERE id = ?", [cartId]);
  return { message: "Removed from cart" };
};

export const clearCart = async (userId: number) => {
  await db.query("DELETE FROM carts WHERE user_id = ?", [userId]);
  return { message: "Cart cleared" };
};

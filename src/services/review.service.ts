import { db } from "../config/db";

export const addReview = async (
  userId: number,
  productId: number,
  rating: number,
  comment: string
) => {
  await db.query(
    "INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)",
    [userId, productId, rating, comment]
  );

  return { message: "Review added" };
};

export const getProductReviews = async (productId: number) => {
  const [rows] = await db.query(
    `
    SELECT r.id, u.name, r.rating, r.comment, r.created_at
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ?
    `,
    [productId]
  );

  return rows;
};

export const deleteReview = async (reviewId: number, userId: number) => {
  await db.query(
    "DELETE FROM reviews WHERE id = ? AND user_id = ?",
    [reviewId, userId]
  );

  return { message: "Review deleted" };
};

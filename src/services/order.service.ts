import { db } from "../config/db";

export const createOrder = async (userId: number, productId: number, qty: number) => {
  // 1. Ambil product
  const [products]: any = await db.query(
    "SELECT * FROM products WHERE id = ?",
    [productId]
  );

  if (products.length === 0) {
    throw new Error("Product not found");
  }

  const product = products[0];

  // 2. Cek stok
  if (product.stock < qty) {
    throw new Error("Stock not enough");
  }

  // 3. Kurangi stok
  await db.query(
    "UPDATE products SET stock = stock - ? WHERE id = ?",
    [qty, productId]
  );

  // 4. Buat order
  const [result]: any = await db.query(
    "INSERT INTO orders (user_id, product_id, qty, price) VALUES (?, ?, ?, ?)",
    [userId, productId, qty, product.price]
  );

  return {
    orderId: result.insertId,
    userId,
    productId,
    qty,
    price: product.price,
  };
};

export const getAllOrders = async () => {
  const [rows] = await db.query(`
    SELECT o.id, u.name as user, p.name as product, o.qty, o.price, o.created_at
    FROM orders o
    JOIN users u ON o.user_id = u.id
    JOIN products p ON o.product_id = p.id
  `);
  return rows;
};

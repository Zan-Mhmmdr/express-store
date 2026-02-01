import { db } from "../config/db";

export const createPayment = async (
  orderId: number,
  method: "transfer" | "ewallet" | "cod"
) => {
  // cek order ada
  const [orders]: any = await db.query(
    "SELECT * FROM orders WHERE id = ?",
    [orderId]
  );

  if (orders.length === 0) {
    throw new Error("Order not found");
  }

  // simpan payment (dummy: langsung success)
  await db.query(
    "INSERT INTO payments (order_id, method, status) VALUES (?, ?, ?)",
    [orderId, method, "paid"]
  );

  // update status order
  await db.query(
    "UPDATE orders SET status = 'paid' WHERE id = ?",
    [orderId]
  );

  return {
    message: "Payment success",
    orderId,
    method,
    status: "paid",
  };
};

export const getPayments = async () => {
  const [rows] = await db.query(`
    SELECT p.id, p.method, p.status, o.id as order_id, o.created_at
    FROM payments p
    JOIN orders o ON p.order_id = o.id
  `);
  return rows;
};

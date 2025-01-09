import { NextApiRequest, NextApiResponse } from "next";

type OrderData = {
  id: string;
  status: string;
};

const mockOrders: OrderData[] = [
  { id: "12345", status: "Shipped" },
  { id: "67890", status: "Delivered" },
  { id: "11111", status: "Processing" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { orderId } = req.query;

  if (!orderId || typeof orderId !== "string") {
    return res.status(400).json({ error: "Invalid order ID." });
  }

  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found." });
  }

  res.status(200).json({ status: order.status });
}

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ message: "Missing authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Fetch orders for the authenticated user
    const orders = await prisma.order.findMany({
      where: { user_id: decoded.userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid or expired token" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } finally {
    await prisma.$disconnect();
  }
}

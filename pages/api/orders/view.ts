import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { token } = req.query as { token: string };

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      const { userId } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as unknown as JwtPayload;

      const orders = await prisma.order.findMany({
        where: { userId: parseInt(userId, 10) },
      });

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// save.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    interface DecodedToken {
      userId: string;
      // add other properties if needed
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (req.method === "GET") {
      const savedItems = await prisma.savedItem.findMany({
        where: { userId: decoded.userId },
      });
      return res.status(200).json(savedItems);
    }

    if (req.method === "POST") {
      const { name, link } = req.body;
      if (!name || !link)
        return res.status(400).json({ message: "Name and link are required." });

      const savedItem = await prisma.savedItem.create({
        data: { userId: decoded.userId, name, link },
      });

      return res.status(201).json(savedItem);
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

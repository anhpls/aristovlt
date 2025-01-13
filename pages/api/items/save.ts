import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface SaveRequestBody {
  token: string;
  name: string;
  link: string;
}

interface JwtPayload {
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { token, name, link }: SaveRequestBody = req.body;

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      const { userId } = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as unknown as JwtPayload;

      const savedItem = await prisma.savedItem.create({
        data: { userId: Number(userId), name, link },
      });

      res.status(201).json(savedItem);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

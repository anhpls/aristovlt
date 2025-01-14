// view.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId } = req.query;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ message: "Invalid or missing userId." });
  }

  try {
    const savedItems = await prisma.savedItem.findMany({ where: { userId } });
    res.status(200).json(savedItems);
  } catch (error) {
    console.error("Error retrieving saved items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

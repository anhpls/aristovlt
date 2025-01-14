// save.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, name, link } = req.body;

  if (!userId || !name || !link) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const savedItem = await prisma.savedItem.create({
      data: { userId, name, link },
    });

    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

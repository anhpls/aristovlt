import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    interface DecodedToken {
      userId: string;
      iat: number;
      exp: number;
    }

    const decoded: DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

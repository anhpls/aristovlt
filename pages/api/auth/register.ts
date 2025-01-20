import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists." }); // Use 409 Conflict
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    // Return success response
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

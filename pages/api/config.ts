import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    passwordProtection: process.env.PASSWORD_PROTECTION === "true",
    storeClosed: process.env.STORE_CLOSED === "true",
  });
}

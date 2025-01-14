import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  databaseUrl: string | undefined;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.json({ databaseUrl: process.env.DATABASE_URL });
}

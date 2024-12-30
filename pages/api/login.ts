import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password } = req.body;

    // Validate the password (stored securely in an environment variable)
    if (password === process.env.SECURE_PASSWORD) {
      const cookie = serialize("accessGranted", "true", {
        path: "/", // Cookie is valid for the entire site
        httpOnly: false, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 3600, // expire after an hour
      });

      res.setHeader("Set-Cookie", cookie);

      // Respond with success
      return res.status(200).json({ success: true });
    }

    // If password is incorrect
    return res
      .status(401)
      .json({ success: false, error: "Incorrect password." });
  }

  // Return a 405 for invalid HTTP methods
  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

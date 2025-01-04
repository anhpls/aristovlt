import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { session_id } = req.query;

  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ valid: false });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session && session.status === "complete") {
      return res.status(200).json({ valid: true });
    }

    return res.status(400).json({ valid: false });
  } catch (error) {
    console.error("Error validating session:", error);
    return res.status(500).json({ valid: false });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Build metadata for Printify
    const metadataCart = cart.map(
      (item: { id: string; sku: string; quantity: number }) => ({
        id: item.id,
        sku: item.sku,
        quantity: item.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map(
        (item: {
          title: string;
          price: number;
          quantity: number;
          sku: string;
          size: string;
        }) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: `${item.title} - Size: ${item.size}`,
              metadata: {
                sku: item.sku,
                size: item.size,
              },
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })
      ),
      metadata: {
        cart: JSON.stringify(metadataCart),
      },
      success_url: `${process.env.BASE_URL}/approved`,
      cancel_url: `${process.env.BASE_URL}/return`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

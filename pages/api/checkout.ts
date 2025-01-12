import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

// Shipping tiers based on cart total
function calculateShippingCost(subtotal: number): number {
  if (subtotal < 50) {
    return 895; // $8.95
  } else if (subtotal < 150) {
    return 6.95; // $6.95
  } else {
    return 0; // Free shipping
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { cart } = req.body;

    // Validate request body
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate cart subtotal
    const totalCartCost = cart.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity,
      0
    );

    // Calculate shipping cost based on subtotal
    const shippingCost = calculateShippingCost(totalCartCost);

    // Build metadata for Printify
    const metadataCart = cart.map(
      (item: { id: string; sku: string; quantity: number; color: string }) => ({
        id: item.id,
        sku: item.sku,
        quantity: item.quantity,
        color: item.color,
      })
    );

    // Create Stripe checkout session
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
          color: string;
        }) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: `${item.title} - Size: ${item.size}`,
              metadata: {
                sku: item.sku,
                size: item.size,
                color: item.color,
              },
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })
      ),

      // Add shipping cost dynamically
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingCost, // Shipping cost based on subtotal
              currency: "usd",
            },
            display_name:
              shippingCost === 0 ? "Free Shipping" : `Standard Shipping`,
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 4,
              },
              maximum: {
                unit: "business_day",
                value: 8,
              },
            },
          },
        },
      ],

      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      billing_address_collection: "required",
      metadata: {
        cart: JSON.stringify(metadataCart), // Add cart details to metadata
      },
      automatic_tax: { enabled: false }, // Enable automatic tax calculations
      allow_promotion_codes: true,
      success_url: `${process.env.BASE_URL}/approved`,
      cancel_url: `${process.env.BASE_URL}/return`,
    });

    // Send session URL back to the frontend
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

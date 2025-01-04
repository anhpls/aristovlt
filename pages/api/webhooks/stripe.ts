import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { sendConfirmationEmail } from "@/utils/email"; // Adjust path as necessary

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export const config = {
  api: {
    bodyParser: false, // Required for Stripe webhook signature verification
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Method Not Allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig || typeof sig !== "string") {
    return res.status(400).send("Webhook signature is missing or invalid");
  }

  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    console.log("Received event type:", event.type);

    // Handle specific event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", session);
        // Send a confirmation email
        const email = session.customer_details?.email;
        if (email) {
          await sendConfirmationEmail(email, session.id);
          console.log("Confirmation email sent to:", email);
        }
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent succeeded:", paymentIntent);
        // Handle successful payment intent logic here
        break;
      }

      case "payment_intent.created": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent created:", paymentIntent);
        // Handle payment intent creation logic if needed
        break;
      }

      case "charge.updated": {
        const charge = event.data.object as Stripe.Charge;
        console.log("Charge updated:", charge);

        // Handle charge update logic, e.g., logging status or notifying the user
        if (charge.status === "succeeded") {
          console.log("Charge succeeded:", charge.id);
        }
        break;
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`);
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown webhook error";
    console.error("Webhook error:", errorMessage);
    res.status(400).send(`Webhook Error: ${errorMessage}`);
  }
}

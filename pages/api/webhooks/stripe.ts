import { createPrintifyOrder } from "@/utils/printify";
import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export const config = {
  api: {
    bodyParser: false, // Required for Stripe webhook verification
  },
};

export default async function handler(req: any, res: any) {
  const sig = req.headers["stripe-signature"] || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event;

  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("Error verifying Stripe webhook:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const shippingDetails = session.shipping_details;

    if (!shippingDetails) {
      console.error("Shipping details are missing.");
      return res.status(400).send("Shipping details are required.");
    }

    // Safely check if metadata exists
    if (session.metadata && session.metadata.cart) {
      const cart = JSON.parse(session.metadata.cart);
      console.log("Payment succeeded. Cart:", cart);

      try {
        // call the createPrintifyOrder function
        await createPrintifyOrder(cart, session, shippingDetails);
        console.log("Order sent to Printify successfully!");
      } catch (error) {
        console.error("Error sending order to Printify:", error);
      }
    } else {
      console.error("No metadata or cart found in session.");
    }
  }

  res.status(200).send("Received Stripe webhook");
}

import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { sendEmailWithTemplate } from "@/utils/email"; // Adjust path as necessary
import { createPrintifyOrder } from "@/utils/printify"; // Adjust path as necessary

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export const config = {
  api: {
    bodyParser: false, // Required for Stripe webhook signature verification
  },
};

// Order number generator
const generateOrderNumber = (): string => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // e.g., "20250125"
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `ORD-${date}-${randomSuffix}`;
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

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Generate custom order number
        const orderNumber = generateOrderNumber();

        // Extract customer info
        const email = session.customer_details?.email || "";
        const firstName =
          session.customer_details?.name?.split(" ")[0] || "Customer";
        const lastName = session.customer_details?.name?.split(" ")[1] || "";
        const items = session.metadata?.cart
          ? JSON.parse(session.metadata.cart)
          : [];

        // Create Printify order and retrieve tracking information
        let trackingInfo: {
          carrier: string;
          number: string;
          url: string;
        } | null = null;

        try {
          if (!items || items.length === 0) {
            throw new Error(
              "Cart metadata is required to create a Printify order."
            );
          }

          if (!session.shipping_details) {
            throw new Error(
              "Shipping details are required to create a Printify order."
            );
          }

          const printifyOrder = await createPrintifyOrder(
            items,
            session,
            session.shipping_details
          );

          // Extract tracking info from Printify order
          if (printifyOrder?.shipments?.length > 0) {
            const shipment = printifyOrder.shipments[0];
            trackingInfo = {
              carrier: shipment.carrier || "N/A",
              number: shipment.number || "N/A",
              url: shipment.url || "N/A",
            };
          }

          console.log("Printify order created successfully:", printifyOrder);
        } catch (error) {
          console.error("Error creating Printify order:", error);
        }

        // Send confirmation email only if tracking info exists
        if (email && trackingInfo) {
          try {
            const grossTotal = items.reduce(
              (total: number, item: { price: number; quantity: number }) =>
                total + item.price * item.quantity,
              0
            );

            const dynamicData = {
              order_number: orderNumber,
              first_name: firstName,
              last_name: lastName,
              email,
              items: items.map(
                (item: { name: string; price: number; quantity: number }) => ({
                  name: item.name,
                  price: `$${(item.price / 100).toFixed(2)}`,
                  quantity: item.quantity,
                  total: `$${((item.price * item.quantity) / 100).toFixed(2)}`,
                })
              ),
              gross_total: `$${(grossTotal / 100).toFixed(2)}`,
              tracking: trackingInfo,
            };

            console.log("Sending email with dynamic data:", dynamicData);

            await sendEmailWithTemplate(
              email,
              "d-4c729ee901bc45cab360f0036af2799d", // Your SendGrid template ID
              dynamicData
            );

            console.log(
              "Confirmation email sent successfully with Order Number:",
              orderNumber
            );
          } catch (error) {
            console.error("Error sending confirmation email:", error);
          }
        } else {
          console.warn(
            "Customer email or tracking information missing; email not sent."
          );
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res
      .status(400)
      .send(
        `Webhook Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
  }
}

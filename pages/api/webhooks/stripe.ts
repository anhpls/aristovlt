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

        // Create Printify order
        let trackingInfo: {
          carrier: string;
          number: string;
          url: string;
        } | null = null;
        try {
          if (!items || items.length === 0) {
            console.error("Cart metadata is missing or invalid.");
            throw new Error(
              "Cart metadata is required to create a Printify order."
            );
          }

          if (!session.shipping_details) {
            console.error(
              "Shipping details are missing in the Stripe session."
            );
            throw new Error(
              "Shipping details are required to create a Printify order."
            );
          }

          const printifyOrder = await createPrintifyOrder(
            items,
            session,
            session.shipping_details
          );

          // Extract tracking info from the Printify response
          if (printifyOrder?.shipments && printifyOrder.shipments.length > 0) {
            const shipment = printifyOrder.shipments[0];
            trackingInfo = {
              carrier: shipment.carrier,
              number: shipment.number,
              url: shipment.url,
            };
          }

          console.log("Printify order created successfully:", printifyOrder);
        } catch (error) {
          console.error("Error creating Printify order:", error);
        }

        // Send confirmation email
        if (email) {
          try {
            interface Item {
              name: string;
              price: number;
              quantity: number;
            }
            await sendEmailWithTemplate(
              email,
              "d-4c729ee901bc45cab360f0036af2799d",
              {
                order_number: orderNumber,
                first_name: firstName,
                last_name: lastName,
                email,
                items: items.map((item: Item) => ({
                  name: item.name,
                  price: `$${(item.price / 100).toFixed(2)}`, // Convert cents to dollars
                  quantity: item.quantity,
                  total: `$${((item.price * item.quantity) / 100).toFixed(2)}`, // Calculate item total
                })),
                gross_total: Array.isArray(items)
                  ? items.reduce((total: number, item: Item) => {
                      if (!item.price || !item.quantity) {
                        console.warn("Item missing price or quantity:", item);
                        return total; // Skip items with missing fields
                      }
                      return total + item.price * item.quantity;
                    }, 0)
                  : 0,
                tracking: trackingInfo, // Include tracking info if available
              }
            );

            console.log(
              "Confirmation email sent with Order Number:",
              orderNumber
            );
          } catch (error) {
            console.error("Error sending confirmation email:", error);
          }
        } else {
          console.warn("Customer email not found in session.");
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

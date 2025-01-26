import { sendEmailWithTemplate } from "@/utils/email";
import { NextApiRequest, NextApiResponse } from "next";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationRequestBody {
  customerEmail: string;
  firstName: string;
  lastName: string;
  orderId: string;
  orderItems: OrderItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const {
    customerEmail,
    firstName,
    lastName,
    orderId,
    orderItems,
  }: OrderConfirmationRequestBody = req.body;

  if (!customerEmail || !orderId || !orderItems || orderItems.length === 0) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const templateId = "d-4c729ee901bc45cab360f0036af2799d";

    // Calculate the gross total
    const grossTotal = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Prepare dynamic data for the email template
    const dynamicData = {
      first_name: firstName,
      last_name: lastName,
      email: customerEmail,
      order_number: orderId,
      items: orderItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: `$${item.price.toFixed(2)}`, // Format price
        total: `$${(item.price * item.quantity).toFixed(2)}`, // Calculate total
      })),
      gross_total: `$${grossTotal.toFixed(2)}`, // Format gross total
    };

    // Send the email
    await sendEmailWithTemplate(customerEmail, templateId, dynamicData);

    res.status(200).json({ message: "Order confirmation email sent." });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    res.status(500).json({ error: "Failed to send confirmation email." });
  }
}

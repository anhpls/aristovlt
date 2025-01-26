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
  if (req.method === "POST") {
    const {
      customerEmail,
      firstName,
      lastName,
      orderId,
      orderItems,
    }: OrderConfirmationRequestBody = req.body;

    if (!customerEmail || !orderId || !orderItems) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      const templateId = "d-4c729ee901bc45cab360f0036af2799d";

      // Prepare dynamic data for the email
      const dynamicData = {
        first_name: firstName,
        last_name: lastName,
        email: customerEmail,
        order_number: orderId,
        items: orderItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price.toFixed(2),
        })),
      };

      await sendEmailWithTemplate(customerEmail, templateId, dynamicData);

      res.status(200).json({ message: "Order confirmation email sent." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send confirmation email." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}

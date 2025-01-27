import Stripe from "stripe";
import fetch from "node-fetch";

export async function createPrintifyOrder(
  cart: { id: string; sku: string; quantity: number }[],
  session: Stripe.Checkout.Session,
  shippingDetails: Stripe.Checkout.Session.ShippingDetails
) {
  const printifyOrder = {
    external_order_id: `ORD-${Date.now()}`, // Unique ID for each request
    line_items: cart.map((item) => {
      if (!item.id || !item.sku || !item.quantity) {
        throw new Error(
          "Invalid item data. Product ID, SKU, and quantity are required."
        );
      }
      return {
        product_id: item.id,
        variant_id: item.sku,
        quantity: item.quantity,
      };
    }),
    shipping_method: 4,
    address_to: {
      first_name: shippingDetails.name?.split(" ")[0] || "",
      last_name: shippingDetails.name?.split(" ")[1] || "",
      email: session.customer_details?.email || "",
      phone: shippingDetails.phone || "",
      address1: shippingDetails.address?.line1 || "",
      address2: shippingDetails.address?.line2 || "",
      city: shippingDetails.address?.city || "",
      state: shippingDetails.address?.state || "",
      country: shippingDetails.address?.country || "",
      zip: shippingDetails.address?.postal_code || "",
    },
  };

  try {
    console.log(
      "Creating Printify Order with payload:",
      JSON.stringify(printifyOrder, null, 2)
    );

    const response = await fetch(
      `https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
        },
        body: JSON.stringify(printifyOrder),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error("Printify API Error Response:", errorResponse);
      throw new Error(`Printify order creation failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Printify Order Created Successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating Printify order:", error);
    throw error;
  }
}

import Stripe from "stripe";

export async function createPrintifyOrder(
  cart: any,
  session: Stripe.Checkout.Session,
  shippingDetails: Stripe.Checkout.Session.ShippingDetails
) {
  // Use `shippingDetails` to send shipping information to Printify
  const printifyOrder = {
    line_items: cart.map((item: any) => ({
      product_id: item.id,
      variant_id: item.variant_id,
      quantity: item.quantity,
    })),
    shipping_method: "Standard",
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

  // Send the Printify order using their API
  const response = await fetch(
    "https://api.printify.com/v1/shops/{shop_id}/orders.json",
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
    throw new Error(`Printify order creation failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

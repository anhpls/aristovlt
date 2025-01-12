import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    try {
      const url = "https://api.sendgrid.com/v3/marketing/contacts";

      // Contact payload
      const data = {
        list_ids: ["9471721b-044a-42ab-be67-ad5c8bfb56b2"],
        contacts: [{ email }],
      };

      // SendGrid API request
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check response
      if (response.ok) {
        return res.status(200).json({ message: "Subscription successful." });
      } else {
        const errorData = await response.json();
        console.error("SendGrid API Error:", errorData);
        return res
          .status(response.status)
          .json({ error: "Failed to add contact to SendGrid." });
      }
    } catch (error) {
      console.error("Error adding contact to SendGrid:", error);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

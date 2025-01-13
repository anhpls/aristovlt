import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not defined");
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendConfirmationEmail = async (to: string, sessionId: string) => {
  const subject = "Your Order Confirmation";
  const htmlContent = `
    <h1>Thank you for your order!</h1>
    <p>Your payment has been received successfully.</p>
    <p>Order ID: ${sessionId}</p>
    <p>Your items will be shipped shortly. Stay tuned for updates!</p>
  `;

  try {
    await sgMail.send({
      to,
      from: "support@aristovlt.com", // Replace with your verified sender email
      subject,
      html: htmlContent,
    });
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error(
      "Error sending email:",
      (error as any).response?.body || (error as any).message
    );
    throw new Error("Failed to send confirmation email.");
  }
};

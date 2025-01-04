import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Or use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export async function sendConfirmationEmail(to: string, orderId: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "ARISTOVLT - Order Confirmation",
    text: `Thank you for your order! Your order ID is ${orderId}.`,
    html: `<p>Thank you for your order! Your order ID is <strong>${orderId}</strong>.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

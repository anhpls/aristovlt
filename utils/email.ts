import sgMail from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  throw new Error("SENDGRID_API_KEY is not defined");
}
sgMail.setApiKey(apiKey);

export const sendEmailWithTemplate = async (
  to: string,
  templateId: string,
  dynamicData: Record<string, unknown>
) => {
  try {
    const msg = {
      to,
      from: "shop@aristovlt.com", // Verified sender email
      templateId,
      dynamicTemplateData: dynamicData, // Data for the template placeholders
    };
    await sgMail.send(msg);
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

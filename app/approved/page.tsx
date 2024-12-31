import { Metadata } from "next";
import ThankYouProcessing from "./ApprovedPage";

export const metadata: Metadata = {
  title: "ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function HomePage() {
  return (
    <>
      <ThankYouProcessing />
    </>
  );
}

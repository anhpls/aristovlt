import { Metadata } from "next";
import PaymentCancelled from "./CanceledPage";

export const metadata: Metadata = {
  title: "ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function HomePage() {
  return (
    <>
      <PaymentCancelled />
    </>
  );
}

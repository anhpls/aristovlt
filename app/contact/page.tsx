import { Metadata } from "next";
import ContactPage from "./ContactClient";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact - ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function HomePage() {
  return (
    <>
      <HeaderWithNavBar />
      <ContactPage />
      <Footer />
    </>
  );
}

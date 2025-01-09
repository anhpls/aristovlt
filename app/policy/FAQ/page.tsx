import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";
import FAQClient from "./FAQClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Frequently Asked Questions - ARISTO VAULT",
    description: "Frequently Asked Questions for ARISTO VAULT",
  };
}

export default function FAQPage() {
  return (
    <>
      <HeaderWithNavBar />
      <FAQClient />
      <Footer />
    </>
  );
}

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
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-200 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1">
          {" "}
          <FAQClient />
        </main>

        <Footer />
      </div>
    </>
  );
}

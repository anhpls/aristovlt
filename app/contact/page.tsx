import { Metadata } from "next";
import ContactPageClient from "./ContactClient";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact - ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-stone-200 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1">
          <ContactPageClient />
        </main>

        <Footer />
      </div>
    </>
  );
}

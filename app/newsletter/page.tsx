import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import NewsletterPage from "./NewsletterClient";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Newsletter - ARISTO VAULT",
  description: "Join the AristoVLT newsletter to gain exclusive access",
};

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1">
          <NewsletterPage />
        </main>

        <Footer />
      </div>
    </>
  );
}

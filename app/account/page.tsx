import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";
import Account from "./AccountClient";

export const metadata: Metadata = {
  title: "ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-stone-300 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1">
          <Account />
        </main>

        <Footer />
      </div>
    </>
  );
}

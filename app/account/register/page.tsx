import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";
import Register from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register - ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-stone-300 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1">
          <Register />
        </main>

        <Footer />
      </div>
    </>
  );
}

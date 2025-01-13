import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";
import Login from "./LoginClient";

export const metadata: Metadata = {
  title: "Login - ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-stone-200 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1">
          <Login />
        </main>

        <Footer />
      </div>
    </>
  );
}

import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";
import AccountWrapper from "./AccountWrapper"; // Import the wrapper

export const metadata: Metadata = {
  title: "User - ARISTO VAULT",
  description: "Welcome to your AristoVLT account page!",
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-stone-300 flex flex-col">
      <HeaderWithNavBar />

      <main className="flex-1">
        <AccountWrapper />
      </main>

      <Footer />
    </div>
  );
}

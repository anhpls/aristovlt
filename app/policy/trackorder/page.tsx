import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";
import TrackYourOrderClient from "./TrackYourOrderClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Track Your Order - ARISTO VAULT",
    description: "Track Your AristoVLT Order",
  };
}

export default function TrackOrderPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1 mb-40">
          {" "}
          <TrackYourOrderClient />
        </main>

        <Footer />
      </div>
    </>
  );
}

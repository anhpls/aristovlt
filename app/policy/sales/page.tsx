import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";
import SalesPolicyClient from "./SalesPolicy";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sales Policy - ARISTO VAULT",
    description: "Shipping, Returns, and Refunds",
  };
}

export default function SalesPolicyPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1 mb-40">
          <SalesPolicyClient />
        </main>

        <Footer />
      </div>
    </>
  );
}

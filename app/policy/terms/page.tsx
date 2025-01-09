import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import Terms from "./TermsClient";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms & Conditions - ARISTO VAULT",
    description: "WHO WE ARE?",
  };
}

export default function TermsPolicyPage() {
  return (
    <>
      <div className="min-h-screen bg-stone-300 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1">
          <Terms />
        </main>

        <Footer />
      </div>
    </>
  );
}

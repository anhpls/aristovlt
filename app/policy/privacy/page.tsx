import { Metadata } from "next";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PRIVACY POLICY - ARISTO VAULT",
    description: "Privacy Policy for ARISTO VAULT",
  };
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col">
        <HeaderWithNavBar />

        <main className="flex-1 mb-40">
          <PrivacyPolicyClient />
        </main>

        <Footer />
      </div>
    </>
  );
}

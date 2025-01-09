import { Metadata } from "next";

import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";

import { Footer } from "@/components/Footer";
import { PrivacyPolicyClient } from "./PrivacyPolicyClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PRIVACY POLICY - ARISTO VAULT",
    description: "WHO WE ARE?",
  };
}

export default function ProductsPage() {
  return (
    <>
      <HeaderWithNavBar />
      <PrivacyPolicyClient />
      <Footer />
    </>
  );
}

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
      <HeaderWithNavBar />
      <PrivacyPolicyClient />
      <Footer />
    </>
  );
}

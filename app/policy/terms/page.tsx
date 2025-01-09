import { Metadata } from "next";

import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import Terms from "./TermsClient";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WHO - ARISTO VAULT",
    description: "WHO WE ARE?",
  };
}

export default function ProductsPage() {
  return (
    <>
      <HeaderWithNavBar />
      <Terms />
      <Footer />
    </>
  );
}

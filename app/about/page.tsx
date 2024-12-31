// page.tsx

import { Metadata } from "next";
import AboutPage from "./AboutClient";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";

import TestimonialPage from "./TestimonialsPageClient";

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
      <AboutPage />
      <TestimonialPage />
    </>
  );
}

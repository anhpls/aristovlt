// page.tsx

import { Metadata } from "next";
import AboutPage from "./AboutClient";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";

import TestimonialPage from "./TestimonialsPageClient";
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
      <div className="min-h-screen bg-stone-200 flex flex-col">
        <main className="flex-1">
          <AboutPage />
          <TestimonialPage />
        </main>

        <Footer />
      </div>
    </>
  );
}

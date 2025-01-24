// page.tsx

import { Metadata } from "next";
// import AboutPage from "./AboutClient";
// import TestimonialPage from "./TestimonialsPageClient";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
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
          {/* <AboutPage />
          <TestimonialPage /> */}
          <h1 className="text-center pt-64 italic font-black text-4xl">
            Coming Soon
          </h1>
        </main>

        <Footer />
      </div>
    </>
  );
}

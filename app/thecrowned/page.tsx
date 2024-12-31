// page.tsx

import { Metadata } from "next";

import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";

import MembershipPerks from "./Ambassadors";

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
      <MembershipPerks />
    </>
  );
}

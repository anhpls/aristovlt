// page.tsx

import { Metadata } from "next";

import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";

import MembershipPerks from "./Ambassadors";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Join the club - ARISTO VAULT",
    description: "in the clerb we all fam",
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

import { Metadata } from "next";
import HomeClient from "./HomeClient"; // Client Component
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export const metadata: Metadata = {
  title: "Home - ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function HomePage() {
  return (
    <>
      <AnnouncementBanner />
      <HeaderWithNavBar />
      <HomeClient />
    </>
  );
}

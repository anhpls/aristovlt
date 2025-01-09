import { Metadata } from "next";
import HomeClient from "./HomeClient"; // Client Component

export const metadata: Metadata = {
  title: "Home - ARISTO VAULT",
  description: "Experience the epitome of elegance and sophistication.",
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
    </>
  );
}

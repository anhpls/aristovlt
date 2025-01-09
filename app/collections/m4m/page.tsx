// page.tsx

import { Metadata } from "next";
import M4MCollectionsPage from "./M4MCollectionClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MADE FOR MOTION - ARISTO VAULT",
    description: "Shop the Made for Motion Collection: Style in Every Step",
  };
}

export default function ProductsPage() {
  return (
    <>
      <M4MCollectionsPage />
    </>
  );
}

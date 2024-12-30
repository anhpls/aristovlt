// page.tsx

import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Shop - ARISTO VAULT",
    description: "Explore our premium collection of products.",
  };
}

export default function ProductsPage() {
  return <ProductsClient />;
}

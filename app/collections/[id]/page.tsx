import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { fetchProduct } from "@/pages/api/products";

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params; // Await the resolved promise
  const { id } = resolvedParams;

  const fallbackMetadata: Metadata = {
    title: "ARISTO VAULT",
    description: "Explore premium products in our collection.",
  };

  try {
    const product = await fetchProduct(id);

    return {
      title: `${product.title} - ARISTO VAULT`,
      description:
        product.description ||
        "Explore this premium product in our collection.",
    };
  } catch (error) {
    console.error("Error fetching product metadata:", error);
    return fallbackMetadata;
  }
}

// Server-side rendering of the product detail page
export default async function Page({ params }: Params) {
  const resolvedParams = await params; // Await the resolved params
  const { id } = resolvedParams;

  try {
    const product = await fetchProduct(id);

    return (
      <div className="min-h-screen bg-stone-200">
        <ProductDetailClient product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-200">
        <p className="text-lg text-red-500">Product not found</p>
      </div>
    );
  }
}

"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Product, Option } from "@/types/types";
import { TypeAnimation } from "react-type-animation";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { Footer } from "@/components/Footer";

const M4MCollectionsPage = () => {
  const [transformedProducts, setTransformedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products using Axios
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      const data: Product[] = response.data?.data || [];

      // Transform products for each color
      const transformed = data.flatMap(
        (product) =>
          product.options
            .find(
              (option) => (option as Option).type?.toLowerCase() === "color"
            )
            ?.values.map((color) => ({
              ...product,
              color, // Add color details
              title: `${product.title} ${color.title}`, // Concatenate title with color
            })) || []
      );

      setTransformedProducts(transformed);
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "Unknown error");
      } else {
        setError("Unknown error");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const m4mProducts = useMemo(() => {
    return transformedProducts.filter((product) => {
      const matchesM4M = product.title.toLowerCase().includes("m4m");
      return (
        product.visible &&
        product.variants.some((v) => v.is_enabled && v.is_available) &&
        matchesM4M
      );
    });
  }, [transformedProducts]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-stone-200">
        <p className="text-center font-extrabold text-neutral-700 text-3xl md:text-6xl lg:text-9xl flex justify-center items-center">
          {" "}
          <span>UNLOCKING</span>
          <TypeAnimation
            sequence={[" ", 0, ".", 10, "..", 10, "...", 0]}
            wrapper="span"
            speed={1}
            repeat={Infinity}
            cursor={false}
            className="inline-block w-10 font-extrabold text-neutral-700 "
          />
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center font-bold text-3xl text-red-500 mt-64">
        Error: {error}
      </p>
    );

  return (
    <>
      <div className="min-h-full bg-gradient-to-br from-stone-100 to-stone-200 py-10 pt-28">
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-center shadow-neutral-500 shadow-inner py-14 flex-col bg-black bg-opacity-10 rounded-sm w-full">
            <h1 className=" drop-shadow-sm text-neutral-50 font-extrabold uppercase">
              <span className="text-4xl lg:text-6xl xl:text-8xl">
                Unvaulted
              </span>
              <span className=" font-bold text-xs m:text-md lg:text-lg xl:text-2xl flex justify-center text-stone-700 font-silverGardenBold">
                {" "}
                Made for Motion
              </span>
            </h1>
            <p className="text-xs md:text-sm text-stone-500 mt-2 ">
              Engineered for the Bold Hustler - Designed to Move, Destined to
              Impress
            </p>
          </div>
        </div>
        <div className="min-h-screen mb-44">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-20 md:gap-x-4 md:gap-y-28 mt-24 px-20 h-full auto-rows-[1fr] ">
            {m4mProducts.map((product, index) => (
              <ProductCard
                key={`${product.id}-${product.color?.id ?? "no-color"}`}
                product={{
                  ...product,
                  variants: product.variants ?? [],
                  imageSrc:
                    product.images.find((image) =>
                      image.src
                        ?.toLowerCase()
                        ?.includes(product.color?.title?.toLowerCase() || "")
                    )?.src || "/placeholder.png",
                }}
                delay={index * 80}
              />
            ))}
          </div>
        </div>
        <HeaderWithNavBar />
      </div>
      <Footer />
    </>
  );
};

export default M4MCollectionsPage;

// ProductsClient.tsx

"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { TypeAnimation } from "react-type-animation";
import { Product, Option } from "@/types/types";

const ProductsClient = () => {
  // const [products, setProducts] = useState<Product[]>([]);
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

      // setProducts(data);
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

  const visibleProducts = useMemo(
    () =>
      transformedProducts.filter(
        (product) =>
          product.visible &&
          product.variants.some((v) => v.is_enabled && v.is_available)
      ),
    [transformedProducts]
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-stone-300">
        <p className="text-center font-extrabold text-neutral-700  text-3xl md:text-6xl lg:text-9xl flex justify-center items-center">
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
    <div className="min-h-full bg-stone-200 py-10 pt-28">
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-center px-10 md:px-16 shadow-neutral-400 shadow-inner py-6 flex-col  bg-black bg-opacity-10 rounded-sm">
          <h1 className="text-2xl md:text-6xl drop-shadow-md text-neutral-50 font-extrabold uppercase">
            unvaulted collections
          </h1>
          <p className="text-xs md:text-sm text-stone-600 font-semibold capitalize md:mt-5">
            Shop all the pieces
          </p>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 md:gap-x-4 md:gap-y-28 mt-24 px-20 h-full auto-rows-[1fr] ">
          {visibleProducts.map((product, index) => (
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
  );
};

export default ProductsClient;

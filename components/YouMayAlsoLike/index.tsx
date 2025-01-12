import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/types";
import { motion } from "framer-motion";

interface YouMayAlsoLikeProps {
  excludeProductId: string;
}

const YouMayAlsoLike: React.FC<YouMayAlsoLikeProps> = ({
  excludeProductId,
}) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const allProducts = Array.isArray(data.data) ? data.data : [];

        // Filter products: exclude current product and only show visible ones
        const filteredProducts = allProducts.filter(
          (product: Product) =>
            product.id !== excludeProductId && product.visible
        );
        const selectedProducts = filteredProducts.slice(0, 4); // Limit to 4 products

        setRelatedProducts(selectedProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [excludeProductId]);

  // Framer Motion variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="mt-12 xl:mt-96 mb-24 px-4 md:px-8 lg:px-16">
      <h2 className="text-lg font-bold text-neutral-800 mb-6 text-center uppercase">
        You May Also Like
      </h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {relatedProducts.map((product) => {
          // Get the first enabled variant's price
          const enabledVariant = product.variants.find(
            (variant) => variant.is_enabled
          );
          const price = enabledVariant ? enabledVariant.price : null;

          return (
            <motion.div
              key={product.id}
              className="group cursor-pointer p-10 bg-white hover:shadow-xl transition duration-200 "
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              variants={cardVariants}
            >
              <Link href={`/collections/${product.id}`}>
                <div>
                  {/* Image container */}
                  <div className="relative w-full h-44 md:h-48 overflow-hidden rounded-lg bg-white">
                    <Image
                      src={
                        product.imageSrc ||
                        product.images.find((img) => img.is_default)?.src ||
                        "/placeholder.png"
                      }
                      alt={product.title}
                      layout="fill"
                      objectFit="contain"
                      className="group-hover:opacity-75 transition-all duration-300"
                    />
                  </div>
                  {/* Text container */}
                  <div className="mt-4 text-center">
                    <p className="text-sm md:text-md text-neutral-800 font-bold truncate ">
                      {product.title}
                    </p>
                    <p className="text-sm text-neutral-500 font-semibold">
                      {price !== null
                        ? `$${(price / 100).toFixed(2)}`
                        : "Price Unavailable"}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default YouMayAlsoLike;

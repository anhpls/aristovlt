// ProductCard/index.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Product } from "@/types/types";

const ProductCard = ({
  product,
  delay,
}: {
  product: Product;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  const [isHovered, setIsHovered] = useState(false);

  // Filter only enabled and available variants
  const enabledVariants = product.variants.filter(
    (variant) =>
      variant.is_enabled &&
      variant.is_available &&
      variant.options.includes(product.color?.id || -1)
  );

  if (enabledVariants.length === 0) {
    // Skip rendering this product if no variants are enabled and available
    return null;
  }

  // Find the front and back images corresponding to the color
  const frontImage = product.images.find(
    (image) =>
      image.variant_ids.some((variantId) =>
        enabledVariants.some((variant) => variant.id === variantId)
      ) && image.position === "front"
  );

  const backImage = product.images.find(
    (image) =>
      image.variant_ids.some((variantId) =>
        enabledVariants.some((variant) => variant.id === variantId)
      ) && image.position === "back"
  );

  // Get color options
  const colorOptions = product.options
    ?.find((option) => option.name.toLowerCase() === "colors")
    ?.values.filter((color) =>
      enabledVariants.some((variant) => variant.options.includes(color.id))
    );

  // Framer Motion variants for slide-up fade-in animation
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: delay / 1000, duration: 0.5 },
    },
  };

  const enabledVariant = enabledVariants.find((variant) =>
    variant.options.includes(product.color?.id || -1)
  );
  const price = enabledVariant ? enabledVariant.price : null;

  return (
    <Link
      href={`/collections/${product.id}?color=${product.color?.id || ""}`}
      passHref
    >
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        className="flex flex-col items-center rounded-lg "
      >
        {/* Product Image */}
        <div
          className="relative w-10/12 h-96 flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && backImage ? (
            <Image
              src={backImage.src}
              alt={`${product.title} - Back`}
              width={450}
              height={450}
              className="object-contain rounded-t-lg"
            />
          ) : frontImage ? (
            <Image
              src={frontImage.src}
              alt={`${product.title} - Front`}
              width={450}
              height={450}
              className="object-contain rounded-t-lg"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Title */}
        <div className="w-full text-center md:-mt-15 mt-2">
          <h2 className="text-sm md:text-base lg:text-sm -mt-8 md:mt-8 font-bold uppercase">
            {product.title}
          </h2>

          {/* Product Price */}
          {price !== null ? (
            <p className="text-sm md:text-md font-semibold text-neutral-600 mt-2">
              ${price / 100}
            </p>
          ) : (
            <p className="text-md md:text-lg font-semibold text-red-500 mt-2">
              Not Available
            </p>
          )}

          {/* Color Options */}
          <div className="flex justify-center space-x-2 mt-2">
            {colorOptions?.map((color) => (
              <div
                key={color.id}
                className="relative group w-4 h-4 rounded-full border border-gray-200 hover:border-neutral-700 hover:border-2 transition hover:z-50 font-bold"
                style={{ backgroundColor: color.colors?.[0] || "#000" }}
              >
                {/* Tooltip for color title */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-125 bg-neutral-700 text-white text-xs rounded px-2 py-1 transition">
                  {color.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;

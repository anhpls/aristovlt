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
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const toggleTap = () => setIsTapped((prev) => !prev);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

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
  // const colorOptions = product.options
  //   ?.find((option) => option.name.toLowerCase() === "colors")
  //   ?.values.filter((color) =>
  //     enabledVariants.some((variant) => variant.options.includes(color.id))
  //   );

  // Framer Motion variants for slide-up fade-in animation
  const variants = {
    hidden: { opacity: 0, y: 20, height: "auto", width: "auto" },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      width: "auto",
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
        className="flex flex-col items-center rounded-md w-full max-w-xs md:max-w-sm lg:max-w-md hover:shadow-md shadow-neutral-800 transition-shadow duration-500"
      >
        {/* Product Image */}
        <div
          className="relative flex items-center justify-center w-full h-72 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-t-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={toggleTap}
        >
          {(isHovered && backImage) || isTapped ? (
            <Image
              src={backImage?.src || ""}
              alt={`${product.title} - Back`}
              layout="fill"
              objectFit="cover" // Ensures the image fills the container entirely
              className="rounded-t-md"
            />
          ) : frontImage ? (
            <Image
              src={frontImage.src}
              alt={`${product.title} - Front`}
              layout="fill"
              objectFit="cover" // Ensures the image fills the container entirely
              className="rounded-t-md"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Title and Price */}
        <div className="w-full flex justify-between items-center mt-4">
          {/* Title */}
          <h2 className="text-xs font-extrabold uppercase text-gray-800 overflow-hidden whitespace-normal max-w-[70%] h-16 ml-4">
            {product.title}
          </h2>

          {/* Price */}
          {price !== null ? (
            <p className="text-xs font-semibold text-neutral-600 mb-12 mr-4">
              ${price / 100} USD
            </p>
          ) : (
            <p className="text-md font-semibold text-red-500">Not Available</p>
          )}

          {/* Color Circle */}
          {/* Color Options
          <div className="flex justify-center space-x-2 mt-2">
            {colorOptions?.map((color) => (
              <div
                key={color.id}
                className="relative group w-4 h-4 rounded-full border border-gray-200 hover:border-neutral-700 hover:border-2 transition hover:z-50 font-bold"
                style={{ backgroundColor: color.colors?.[0] || "#000" }}
              >
                {/* Tooltip for color title */}
          {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-125 bg-neutral-700 text-white text-xs rounded px-2 py-1 transition">
                  {color.title}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;

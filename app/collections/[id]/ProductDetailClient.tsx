// ProductDetailClient.tsx

"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/contexts/CartContext";
import { Product, Variant } from "@/types/types";

const ProductDetailClient = ({ product }: { product: Product }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const colorQuery = searchParams?.get("color");
  const productPrice = product.variants[0]?.price
    ? (product.variants[0].price / 100).toFixed(2)
    : "N/A";

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants[0] || null
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  // const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL"];

  useEffect(() => {
    if (colorQuery) {
      const defaultColorId = parseInt(colorQuery, 10);

      const colorsOption = product.options.find(
        (option) => option.name.toLowerCase() === "colors"
      );

      if (colorsOption?.values.some((color) => color.id === defaultColorId)) {
        setSelectedColor(defaultColorId);

        const defaultVariant = product.variants.find((variant) =>
          variant.options.includes(defaultColorId)
        );

        if (defaultVariant) {
          setSelectedVariant(defaultVariant);

          if (
            selectedSize &&
            product.variants.some(
              (variant) =>
                variant.options.includes(defaultColorId) &&
                variant.options.includes(selectedSize)
            )
          ) {
            setSelectedSize(selectedSize);
          } else {
            setSelectedSize(null);
          }
        }
      }
    }
  }, [colorQuery, product.options, product.variants, selectedSize]);

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setSelectedImage((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    if (!selectedVariant || !selectedColor || !selectedSize) {
      alert("Please select a color and size before adding to cart.");
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: selectedVariant.price / 100 || 0,
      size: product.options
        ?.find((option) => option.name.toLowerCase() === "sizes")
        ?.values.find((size) => size.id === selectedSize)?.title,
      color: product.options
        ?.find((option) => option.name.toLowerCase() === "colors")
        ?.values.find((color) => color.id === selectedColor)?.title,
      quantity: 1,
    });
  };

  const handleSelectColor = (colorId: number) => {
    setSelectedColor(colorId);

    const variant = product.variants.find((variant) =>
      variant.options.includes(colorId)
    );
    if (variant) setSelectedVariant(variant);

    const newUrl = `/collections/${product.id}?color=${colorId}`;
    router.push(newUrl);
  };

  const filteredImages = selectedVariant
    ? product.images.filter((image) =>
        image.variant_ids.includes(selectedVariant.id)
      )
    : product.images;

  return (
    <>
      <HeaderWithNavBar />
      <div className="mx-auto py-10 px-4 sm:px-10 md:px-20 pt-40 -mt-48 md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8">
          <div className="flex flex-col space-y-4 relative">
            <div className="relative w-full h-130 rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={
                      filteredImages[selectedImage]?.src || "/placeholder.png"
                    }
                    alt={product.title}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-stone-200 transition-colors duration-300"
              aria-label="Previous Image"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-stone-200 transition-colors duration-300"
              aria-label="Next Image"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 sticky top-20 self-start h-fit -mt-48 md:mt-0">
            <h1 className="text-lg font-bold">{product.title}</h1>
            <div className="mt-4">
              <p className="text-sm md:text-lg font-medium text-zinc-500">
                ${productPrice}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-sm font-extrabold text-neutral-600">Colors:</p>
              <div className="flex space-x-4 mt-2 relative">
                {product.options
                  ?.find((option) => option.name.toLowerCase() === "colors")
                  ?.values.filter((color) =>
                    product.variants.some(
                      (variant) =>
                        variant.is_enabled && variant.options.includes(color.id)
                    )
                  )
                  ?.map((color) => (
                    <div key={color.id} className="relative group">
                      <button
                        onClick={() => handleSelectColor(color.id)}
                        className={`w-6 h-6 rounded-full border ${
                          selectedColor === color.id
                            ? "border-black ring-2 ring-stone-600"
                            : "border-gray-300"
                        }`}
                        style={{
                          backgroundColor: color.colors?.[0] || "#000",
                        }}
                        aria-label={color.title}
                      ></button>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-110 bg-neutral-700 text-white font-bold text-xs rounded px-2 py-1 transition">
                        {color.title}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-extrabold text-neutral-600">Sizes:</p>
              <div className="flex space-x-2 mt-2">
                {product.options
                  .find((option) => option.name === "Sizes")
                  ?.values.map((size) => {
                    const isAvailable = product.variants.some(
                      (variant) =>
                        variant.is_enabled &&
                        selectedColor !== null &&
                        variant.options.includes(selectedColor) &&
                        variant.options.includes(size.id)
                    );

                    return (
                      <button
                        key={size.id}
                        onClick={() => {
                          if (isAvailable) setSelectedSize(size.id);
                        }}
                        disabled={!isAvailable}
                        className={`px-3 py-1 md:px-4 md:py-2 rounded-lg border ${
                          selectedSize === size.id
                            ? "bg-black text-white"
                            : "bg-white text-neutral-800"
                        } ${
                          !isAvailable
                            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                            : "hover:bg-neutral-800 hover:text-white"
                        }`}
                      >
                        {size.title}
                      </button>
                    );
                  })}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`mt-8 bg-black text-white py-3 px-6 rounded-lg hover:bg-neutral-800 ${
                !selectedVariant || !selectedColor || !selectedSize
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!selectedVariant || !selectedColor || !selectedSize}
            >
              Add to Cart
            </button>

            <div>
              <button
                onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                className="text-sm font-medium text-neutral-600 shadow py-3 w-full mt-2"
              >
                {isDescriptionExpanded ? "Hide Details" : "Show Details"}
              </button>
              <motion.div
                initial={false}
                animate={isDescriptionExpanded ? "open" : "collapsed"}
                variants={{
                  open: { height: "auto", opacity: 1 },
                  collapsed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden pt-10 text-neutral-500 text-xs"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailClient;

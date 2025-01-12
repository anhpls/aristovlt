import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Product, Images as ProductImage } from "@/types/types";
import { memo } from "react";

interface ProductDetailLeftProps {
  product: Product;
  filteredImages: ProductImage[];
  selectedImage: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const ProductDetailLeft: React.FC<ProductDetailLeftProps> = ({
  product,
  filteredImages,
  selectedImage,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="flex flex-col space-y-4 relative">
      <div className="relative w-full h-130 md:h-130 lg:h-130 xl:h-130 rounded-lg overflow-hidden">
        {/* change media query pic heights after new mockups */}
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
              src={filteredImages[selectedImage]?.src || "/placeholder.png"}
              alt={product.title}
              fill
              style={{ objectFit: "contain" }}
              className=""
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
  );
};

export default memo(ProductDetailLeft);

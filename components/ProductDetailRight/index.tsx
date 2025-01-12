import { motion } from "motion/react";
import { Product } from "@/types/types";
import { memo, useState } from "react";

interface ProductDetailRightProps {
  product: Product;
  selectedColor: number | null;
  selectedSize: number | null;
  setSelectedColor: (colorId: number) => void;
  setSelectedSize: (sizeId: number) => void;
  handleAddToCart: () => void;
  isDescriptionExpanded: boolean;
  setIsDescriptionExpanded: (expanded: boolean) => void;
  availableColors: { id: number; title: string; colors: string[] }[];
  isShippingExpanded: boolean;
  setIsShippingExpanded: (expanded: boolean) => void;
}

const ProductDetailRight: React.FC<ProductDetailRightProps> = ({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  handleAddToCart,
  isDescriptionExpanded,
  setIsDescriptionExpanded,
}) => {
  const enabledVariant = product.variants.find((variant) => variant.is_enabled);
  const [isShippingExpanded, setIsShippingExpanded] = useState(false);

  const productPrice = enabledVariant?.price
    ? (enabledVariant.price / 100).toFixed(2)
    : "N/A";

  const availableColors = product.options
    ?.find((option) => option.name.toLowerCase() === "colors")
    ?.values.filter((color) =>
      product.variants.some(
        (variant) => variant.is_enabled && variant.options.includes(color.id)
      )
    );

  return (
    <div className="flex flex-col space-y-4 sticky top-20 self-start h-fit mx-5 md:mx-0 md:mt-20 xl:mt-2 ">
      <h1 className="text-lg font-bold uppercase">{product.title}</h1>
      <div className="mt-4">
        <p className="text-sm md:text-lg font-medium text-zinc-500">
          ${productPrice}
        </p>
      </div>

      {/* Colors */}
      <div className="mt-6">
        <p className="text-sm font-extrabold text-neutral-600">Colors:</p>
        <div className="flex space-x-4 mt-2 relative">
          {availableColors?.map((color) => (
            <div key={color.id} className="relative group">
              <button
                onClick={() => setSelectedColor(color.id)}
                className={`w-6 h-6 rounded-full border ${
                  selectedColor === color.id
                    ? "border-black ring-2 ring-stone-600"
                    : "border-gray-300"
                }`}
                style={{
                  backgroundColor: color.colors?.[0] || "#000",
                }}
                aria-label={color.title}
              />
              {/* Tooltip for color title */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-125 bg-neutral-700 text-white text-xs rounded px-2 py-1 transition">
                {color.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-6">
        <p className="text-sm font-extrabold text-neutral-600">Sizes:</p>
        <div className="flex space-x-2 mt-2">
          {product.options
            .find(
              (option) =>
                option.name.toLowerCase() === "sizes" ||
                option.type?.toLowerCase() === "size"
            )
            ?.values.filter((size) =>
              ["XS", "S", "M", "L", "XL", "2XL"].includes(size.title)
            )
            .map((size) => {
              const matchingVariant = product.variants.find(
                (variant) =>
                  variant.options.includes(size.id) &&
                  (selectedColor === null ||
                    variant.options.includes(selectedColor!))
              );

              const isAvailable = matchingVariant?.is_available ?? false;

              return (
                <button
                  key={size.id}
                  onClick={() => isAvailable && setSelectedSize(size.id)}
                  disabled={!isAvailable} // Disable if not available
                  className={`px-3 py-1 md:px-4 md:py-2 rounded-lg border ${
                    !isAvailable
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : selectedSize === size.id
                      ? "bg-black text-white"
                      : "bg-white text-neutral-800"
                  }`}
                >
                  {size.title}
                </button>
              );
            })}
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`mt-8 bg-black text-white py-3 px-6 rounded-lg hover:bg-neutral-800 ${
          !selectedSize ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!selectedSize}
      >
        Add to Cart
      </button>

      {/* Description */}
      <div className="mt-2">
        {" "}
        {/* Added consistent top margin */}
        <button
          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          className="text-sm font-medium text-neutral-600 shadow py-3 w-full "
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
          className="overflow-hidden pt-4 text-neutral-500 text-xs"
        >
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </motion.div>
      </div>

      {/* Shipping & Returns */}
      <div className="mt-2">
        {" "}
        {/* Replaced -mt-96 with consistent spacing */}
        <button
          onClick={() => setIsShippingExpanded(!isShippingExpanded)}
          className="text-sm font-medium text-neutral-600 shadow py-3 w-full -mt-10"
        >
          {isShippingExpanded
            ? "Hide Shipping & Returns"
            : "Shipping & Returns"}
        </button>
        <motion.div
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={
            isShippingExpanded
              ? { maxHeight: 500, opacity: 1 }
              : { maxHeight: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden pt-4 text-neutral-500 text-xs"
        >
          <div>
            <p>
              <strong>Shipping:</strong> Orders are processed within 1–2
              business days. Delivery time is estimated at 3–5 business days for
              standard shipping. Free shipping is available on orders over $150.
            </p>
            <p className="mt-4">
              <strong>Returns:</strong> We accept returns within 30 days of
              purchase. Items must be in their original condition with tags
              attached. Please contact our support{" "}
              <span className="font-bold">contact@aristovlt.com</span> team for
              a return label.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(ProductDetailRight);

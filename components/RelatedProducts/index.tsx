import React from "react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  images: { src: string }[];
  variants: { price: number }[];
}

interface RelatedProductsProps {
  relatedProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
}) => {
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-neutral-800 mb-8">
        Explore More Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[0]?.src || "/placeholder.png"}
                alt={product.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>

            {/* Product Title */}
            <h3 className="text-lg font-bold text-neutral-800 mb-2">
              {product.title}
            </h3>

            {/* Product Price */}
            <p className="text-sm text-neutral-500 mb-4">
              $
              {product.variants[0]?.price
                ? (product.variants[0].price / 100).toFixed(2)
                : "N/A"}
            </p>

            {/* View Product Button */}
            <button
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-neutral-800 transition-colors duration-300"
              onClick={() => {
                // Redirect to the related product's details page
                window.location.href = `/collections/${product.id}`;
              }}
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

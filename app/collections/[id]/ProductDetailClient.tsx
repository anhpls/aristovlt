"use client";

import ProductDetailLeft from "@/components/ProductDetailLeft";
import ProductDetailRight from "@/components/ProductDetailRight";
import { useState, useEffect, useCallback, useMemo } from "react";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, Variant } from "@/types/types";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";
import { useCart } from "@/contexts/CartContext";
import { Footer } from "@/components/Footer";

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants[0] || null
  );
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
  const [filteredImages, setFilteredImages] = useState(product.images);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const colorQuery = searchParams?.get("color");
  const [isShippingExpanded, setIsShippingExpanded] = useState(false);

  useEffect(() => {
    if (colorQuery && selectedColor === null) {
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
  }, [
    colorQuery,
    selectedColor,
    product.options,
    product.variants,
    selectedSize,
  ]);

  useEffect(() => {
    if (selectedColor !== null) {
      const variant = product.variants.find((v) =>
        v.options.includes(selectedColor)
      );
      if (variant) {
        setFilteredImages(
          product.images.filter((img) => img.variant_ids.includes(variant.id))
        );
        setSelectedImage(0);
      }

      const currentQuery = searchParams?.get("color");
      if (currentQuery !== String(selectedColor)) {
        const newUrl = `/collections/${product.id}?color=${selectedColor}`;
        router.push(newUrl);
      }
    }
  }, [selectedColor, product, router, searchParams]);

  const handleNext = useCallback(() => {
    setSelectedImage((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages]);

  const handlePrev = useCallback(() => {
    setSelectedImage((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages]);

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant || !selectedSize) {
      alert("Please select a color and size before adding to cart.");
      return;
    }
    const selectedImage = product.images.find((image) =>
      image.variant_ids?.includes(selectedVariant.id)
    )?.src;

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
      image: selectedImage || "/placeholder.png",
    });
  }, [selectedVariant, selectedColor, selectedSize, addToCart, product]);

  const handleSelectColor = (colorId: number) => {
    const scrollY = window.scrollY;
    setSelectedColor(colorId);

    const variant = product.variants.find((variant) =>
      variant.options.includes(colorId)
    );
    if (variant) setSelectedVariant(variant);

    const newUrl = `/collections/${product.id}?color=${colorId}`;
    router.push(newUrl);

    window.scrollTo(0, scrollY);
  };

  const availableColors = useMemo(
    () =>
      product.options
        ?.find((option) => option.name.toLowerCase() === "colors")
        ?.values.filter((color) =>
          product.variants.some(
            (variant) =>
              variant.is_enabled && variant.options.includes(color.id)
          )
        )
        .map((color) => ({
          ...color,
          colors: color.colors || [],
        })) || [],
    [product.options, product.variants]
  );

  return (
    <>
      <HeaderWithNavBar />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 md:py-44 md:px-20 mt-20 md:-mt-14 xl:-mt-10">
        <ProductDetailLeft
          product={product}
          filteredImages={filteredImages}
          selectedImage={selectedImage}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />

        <ProductDetailRight
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          setSelectedColor={handleSelectColor}
          setSelectedSize={setSelectedSize}
          handleAddToCart={handleAddToCart}
          isDescriptionExpanded={isDescriptionExpanded}
          setIsDescriptionExpanded={setIsDescriptionExpanded}
          availableColors={availableColors}
          isShippingExpanded={isShippingExpanded}
          setIsShippingExpanded={setIsShippingExpanded}
        />
      </div>

      <section className="xl:-mt-96 ">
        <YouMayAlsoLike excludeProductId={product.id} />
      </section>

      <Footer />
    </>
  );
};

export default ProductDetailClient;

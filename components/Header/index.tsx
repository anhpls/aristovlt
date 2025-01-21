"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Product } from "@/types/types";
import Image from "next/image";
import axios from "axios";

interface HeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({}) => {
  const pathname = usePathname();
  const { toggleCartVisibility, cart } = useCart(); // Access CartContext
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus(); // Focus the input field when search bar opens
    }
  }, [isSearchOpen]); // Runs every time isSearchOpen changes

  const handleProductClick = (product: Product) => {
    // Construct the URL with dynamic query parameters
    const url = `/collections/${product.id}?color=${product.color?.id}`;
    // Use the router to redirect
    router.push(url);
  };

  // Dynamic header color based on the current path
  const switchColor =
    pathname === "/home" ? "text-white " : "text-neutral-800 ";

  const handleRedirect = () => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      sessionStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      router.push("/account");
    } else {
      router.push("/account/login");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        const data: Product[] = response.data?.data || [];

        const transformed = data.flatMap(
          (product) =>
            product.options
              .find((option) => option.type?.toLowerCase() === "color")
              ?.values.map((color) => {
                // Filter variants that match the current color
                const enabledVariants = product.variants.filter(
                  (variant) =>
                    variant.is_enabled &&
                    variant.is_available &&
                    variant.options.includes(color.id) // Ensure it matches the color ID
                );

                // Get the image specific to the enabled variant and color
                const frontImage = product.images.find((image) =>
                  image.variant_ids.some((variantId) =>
                    enabledVariants.some((variant) => variant.id === variantId)
                  )
                );

                return {
                  ...product,
                  color, // Add color details
                  title: `${product.title} ${color.title}`, // Include the color in the title
                  variants: enabledVariants, // Only include variants for the current color
                  imageSrc:
                    frontImage && frontImage.src
                      ? frontImage.src
                      : "/placeholder.png", // Use the front image or a placeholder
                };
              }) || []
        );

        setProducts(transformed);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Handle search term changes and filter products
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.replace(/\s/g, "") === "") {
      setFilteredProducts([]); // Reset the filtered products
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(value.toLowerCase()) &&
        product.visible && // Only show visible products
        product.variants.length > 0 // Only show products with enabled variants
    );
    setFilteredProducts(filtered);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-center p-4">
      {/* Title Positioned Consistently */}
      <h1
        className={`text-xl font-extrabold hover:cursor-pointer ml transition ${switchColor}`}
      >
        <Link href="/home">ARISTO VAULT</Link>
      </h1>

      {/* Right-Aligned Icons */}
      <div className="absolute right-6 md:right-8 flex items-center space-x-3 md:space-x-5 lg:space-x-7 z-40">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSearch}
          className="flex items-center"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 50,
          }}
        >
          <MagnifyingGlassIcon
            className={`w-6 h-6 transition-colors  hover:cursor-pointer   ${switchColor}`}
          />
        </motion.div>

        {/* Shopping Bag Icon with Cart Toggle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center relative"
          onClick={toggleCartVisibility} // Toggle cart visibility on click
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 50,
          }}
        >
          <ShoppingCartIcon
            className={`w-6 h-6 transition-colors hover:cursor-pointer  ${switchColor}`}
          />
          {cart.length > 0 && ( // Show badge only if there are items in the cart
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </motion.div>

        {/* User Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 50,
          }}
          onClick={handleRedirect}
        >
          <UserIcon
            className={`w-6 h-6 transition-colors hover:cursor-pointer ${switchColor}`}
          />
        </motion.div>
      </div>

      {/* Darkened Overlay */}
      {isSearchOpen && (
        <div
          onClick={() => {
            setIsSearchOpen(false);
            setSearchTerm("");
          }}
          ref={overlayRef}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-40"
        />
      )}
      {/* Search Bar (Full-width overlay when opened) */}
      <motion.div
        ref={searchBarRef}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isSearchOpen ? 1 : 0,
          height: isSearchOpen ? "80px" : "0",
        }}
        transition={{ duration: 0.1 }}
        className={`absolute z-60 top-0 left-0 right-0 bg-white p-4 flex items-center justify-between w-full ${
          isSearchOpen ? "" : "pointer-events-none"
        }`} // Disable pointer events when closed
      >
        <MagnifyingGlassIcon className="flex w-5 h-5 lg:ml-10" />

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search For Pieces"
          className="w-full bg-transparent border-none text-neutral-800 text-sm lg:text-md outline-none flex pl-14 lg:pl-5  "
        />
        {/* Close Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
          onClick={() => {
            toggleSearch();
            setSearchTerm("");
          }}
        >
          <IoMdClose className="w-6 h-6 text-neutral-800 mr-5" />
        </motion.div>
      </motion.div>

      {/* Product Search Results Inside Search Bar */}
      {isSearchOpen && searchTerm && (
        <motion.div
          className="absolute top-[80px] left-0 right-0 bg-white p-4 z-50 "
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={`${product.id}-${product.color?.id}`}
                className="shadow-md shadow-neutral-300 py-12 px-5 cursor-pointer w-9/12"
                onClick={() => handleProductClick(product)}
              >
                <Image
                  src={product.imageSrc || "/placeholder.png"} // Ensure the image matches the color
                  alt={product.title}
                  width={800}
                  height={800}
                  className="w-full h-52 object-contain mb-4"
                />
                <p className="text-xs uppercase font-bold text-center">
                  {product.title}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/collections"
            className="block mt-10  text-center text-black-600 font-bold hover:text-neutral-500 transition"
          >
            View More
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Header;

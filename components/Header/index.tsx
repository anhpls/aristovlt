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
// Import CartContext

interface HeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({}) => {
  const pathname = usePathname();
  const { toggleCartVisibility, cart } = useCart(); // Access CartContext
  const router = useRouter();

  // Dynamic header color based on the current path
  const switchColor =
    pathname === "/home" ? "text-white " : "text-neutral-800 ";

  const handleRedirect = () => {
    router.push("/account/login");
  };

  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-center p-4 z-40">
      {/* Title Positioned Consistently */}
      <h1
        className={`text-xl font-extrabold hover:cursor-pointer ml transition ${switchColor}`}
      >
        <Link href="/home">ARISTO VAULT</Link>
      </h1>

      {/* Right-Aligned Icons */}
      <div className="absolute right-6 md:right-8 flex items-center space-x-3 md:space-x-5 lg:space-x-7">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
    </div>
  );
};

export default Header;

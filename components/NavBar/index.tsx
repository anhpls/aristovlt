"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NavBar = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const pathname = usePathname();

  // Variants for the lock icon
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 0 },
  };

  // Variants for the links
  const linkVariants = {
    hidden: { opacity: 0, x: -50 }, // Start hidden and slightly offset
    visible: {
      opacity: 1,
      x: 0, // Move to the final position
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Parent container for staggered effect
  const containerVariants = {
    hidden: { opacity: 1 }, // Container is always visible
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger children by 0.2 seconds
      },
    },
  };

  const switchColor = pathname === "/home" ? "text-white" : "text-neutral-800";
  const [vaultOpen, setVaultOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Lock Menu Icon */}
      <motion.button
        onClick={toggleMenu}
        className={`fixed top-5 left-6 z-50 ${switchColor}`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          opacity: isVisible || isOpen ? 1 : 0,
          y: isVisible || isOpen ? 0 : -20,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <motion.div
          variants={iconVariants}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {isOpen ? (
            <LockOpenIcon className="w-6 h-6 lg:w-6 lg:h-6 text-white" />
          ) : (
            <LockClosedIcon className="w-6 h-6 lg:w-6 lg:h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Animated NavBar */}
      <motion.div
        className="fixed top-0 left-0 h-full w-64 bg-black bg-opacity-80 text-white z-40"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.2 }}
      >
        <motion.nav
          className="mt-16 space-y-5 font-semibold text-sm lg:space-y-6 p-6 "
          variants={containerVariants} // Apply the container variants
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
        >
          {/* VAULTS with Subcategories */}
          <div className="relative group left-4 ">
            <button
              onClick={() => setVaultOpen(!vaultOpen)}
              className="w-full text-left hover:underline underline-offset-8"
            >
              VAULTS
            </button>
            {vaultOpen && (
              <motion.ul
                className="pl-4 mt-4 space-y-4 text-zinc-300 text-xs underline-offset-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <li>
                  <Link
                    href="/collections"
                    className={`hover:text-white ${
                      pathname === "/collections" ? "underline text-white " : ""
                    }`}
                  >
                    ALL LOOKS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/m4m"
                    className={`hover:text-white ${
                      pathname === "/collections/m4m"
                        ? "underline text-white"
                        : ""
                    }`}
                  >
                    MADE FOR MOTION
                  </Link>
                </li>
                {/* <li>
                  <Link href="/vaults/legacy" className="hover:text-gray-200">
                    Legacy Collection
                  </Link>
                </li>
                <li>
                  <Link href="/vaults/limited" className="hover:text-gray-200">
                    Limited Drops
                  </Link>
                </li> */}
              </motion.ul>
            )}
          </div>
          {[
            { href: "/about", label: "ABOUT" },
            { href: "/contact", label: "CONTACT" },
            // { href: "/aristocracy", label: "THE ARISTOCRACY" },
          ].map((link) => (
            <motion.div
              key={link.href}
              variants={linkVariants} // Apply the individual link variants
              className={`text-md ${
                pathname === link.href
                  ? " underline-offset-8 underline text-white "
                  : ""
              } hover:underline underline-offset-8  rounded px-4`}
            >
              <Link href={link.href}>{link.label}</Link>
            </motion.div>
          ))}
        </motion.nav>
        <motion.nav
          className="bottom-0 absolute space-y-2 font-semibold text-xs lg:space-y-2 p-6 "
          variants={containerVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
        >
          {[
            { href: "/policy/terms", label: "TERMS OF SERVICE" },
            { href: "/policy/privacy", label: "PRIVACY POLICY" },
            { href: "/policy/sales", label: "REFUND + SHIPPING POLICY" },
            { href: "/policy/FAQ", label: "FAQ" },
            { href: "/policy/trackorder", label: "TRACK YOUR ORDER" },
            { href: "/newsletter", label: "NEWSLETTER" },
          ].map((link) => (
            <motion.div
              key={link.href}
              variants={linkVariants}
              className={`text-md ${
                pathname === link.href
                  ? " underline-offset-8 underline text-white "
                  : ""
              } hover:underline underline-offset-8  rounded px-4`}
            >
              <Link href={link.href}>{link.label}</Link>
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>
    </>
  );
};

export default NavBar;

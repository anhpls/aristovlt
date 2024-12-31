"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ThankYouPage = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null; // Avoid rendering on server side

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-neutral-200 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-extrabold text-gray-800 mb-4"
        >
          Thank You for Your Purchase!
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="text-lg text-gray-600"
        >
          Your order is being processed and will be on its way soon!
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        className="mt-10 flex flex-col items-center space-y-4"
      >
        <Image
          src="/images/thank_you_illustration.svg"
          alt="Thank You Illustration"
          width={300}
          height={300}
          className="rounded-lg"
        />

        <Link href="/collections">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-neutral-800 text-white rounded-lg shadow-lg font-medium tracking-wide uppercase"
          >
            Continue Shopping
          </motion.a>
        </Link>

        <Link href="/order-history">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white border border-neutral-800 text-neutral-800 rounded-lg shadow-lg font-medium tracking-wide uppercase"
          >
            View Order History
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;

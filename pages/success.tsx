"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ThankYouProcessing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {/* Order Processed Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 140, damping: 12 }}
          className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h11M9 21V10m0 0L21 3"
            />
          </svg>
        </motion.div>

        {/* Thank You Text */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-extrabold text-gray-800 mb-4"
        >
          Thank You for Your Purchase!
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="text-lg text-gray-600"
        >
          We’re processing your order and will notify you when it ships.
        </motion.p>
      </motion.div>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="mt-10"
      >
        <Image
          src="/images/order_processing_illustration.svg" // Replace with your image
          alt="Order Processing Illustration"
          width={350}
          height={350}
          className="rounded-md shadow-md"
        />
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
      >
        <Link href="/collections">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg font-medium tracking-wide uppercase text-center"
          >
            Continue Shopping
          </motion.a>
        </Link>

        <Link href="/order-status">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gray-800 text-white rounded-lg shadow-lg font-medium tracking-wide uppercase text-center"
          >
            Check Order Status
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYouProcessing;

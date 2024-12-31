"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const PaymentCancelled = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-red-500 p-4 rounded-full shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-12 h-12"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.707 14.293a1 1 0 00-1.414 0L12 16.586l-4.293-4.293a1 1 0 00-1.414 1.414L10.586 18l-4.293 4.293a1 1 0 001.414 1.414L12 19.414l4.293 4.293a1 1 0 001.414-1.414L13.414 18l4.293-4.293a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        className="text-3xl font-bold text-gray-800 mt-6"
      >
        Payment Cancelled
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
        className="text-gray-600 mt-2 text-center px-4"
      >
        Your payment has been cancelled. Don’t worry, you can try again anytime.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut" }}
        className="mt-8 flex space-x-4"
      >
        <button
          onClick={() => router.push("/collections")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
        >
          Browse Products
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
        >
          Go to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;

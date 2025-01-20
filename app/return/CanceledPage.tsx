"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdCancel } from "react-icons/md";

const PaymentCancelled = () => {
  const router = useRouter();

  useEffect(() => {
    const referrer = document.referrer;
    const isFromStripe = referrer.includes("stripe.com");
    if (!isFromStripe) {
      window.location.href = "/home"; // Redirect to /home if not from Stripe
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-300">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-white p-6 rounded-full shadow-md"
      >
        <MdCancel className="w-12 h-12 text-gray-700" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        className="text-3xl font-bold text-gray-800 mt-8"
      >
        Payment Cancelled
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
        className="text-gray-600 mt-4 text-center px-6 max-w-lg"
      >
        Your payment has been cancelled. Don’t worry, you can try again anytime.
        Feel free to continue browsing our products.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut" }}
        className="mt-8 flex flex-col sm:flex-row sm:space-x-4 items-center space-y-4 sm:space-y-0"
      >
        <button
          onClick={() => router.push("/collections")}
          className="bg-stone-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-stone-200 transition duration-300 shadow-sm"
        >
          Browse Products
        </button>
        <button
          onClick={() => router.push("/home")}
          className="bg-stone-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-stone-300 transition duration-300 shadow-sm"
        >
          Go to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;

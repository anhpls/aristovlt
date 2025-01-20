"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { MdCheckCircle } from "react-icons/md";

const ThankYouProcessing = () => {
  useEffect(() => {
    const referrer = document.referrer;
    const isFromStripe = referrer.includes("stripe.com");
    if (!isFromStripe) {
      window.location.href = "/home"; // Redirect to /home if not from Stripe
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-300 flex flex-col items-center justify-center p-8">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 140, damping: 12 }}
        className="bg-white p-6 rounded-full shadow-md"
      >
        <MdCheckCircle className="w-12 h-12 text-green-600" />
      </motion.div>

      {/* Thank You Text */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-extrabold text-gray-800 mt-6 text-center"
      >
        Thank You for Your Purchase!
      </motion.h1>
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="text-lg text-gray-600 mt-2 text-center max-w-lg"
      >
        Your order has been successfully placed! We’re excited to have you as
        part of the AristoVLT family. Keep an eye on your email for confirmation
        and shipping updates.
        <br />
        <br />
        With gratitude,
        <br />
        <span className="font-semibold">The AristoVLT Team</span>
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
      >
        <Link href="/collections">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-stone-100 text-gray-800 rounded-lg shadow-lg font-medium text-center tracking-wide uppercase"
          >
            Continue Shopping
          </motion.div>
        </Link>

        <Link href="/policy/trackorder">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-stone-200 text-gray-700 rounded-lg shadow-lg font-medium text-center tracking-wide uppercase"
          >
            Check Order Status
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYouProcessing;

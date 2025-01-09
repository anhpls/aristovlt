"use client";
import React from "react";
import { motion } from "framer-motion";

const SalesPolicyClient: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-44 -mt-10">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-xl md:text-4xl font-extrabold mb-6 text-center"
          variants={sectionVariants}
        >
          Shipping & Return Policy
        </motion.h1>
        <motion.p
          className="text-sm md:text-md mb-12 text-center text-gray-600"
          variants={sectionVariants}
        >
          At AristoVLT, we are committed to ensuring your satisfaction with
          every purchase. Below is our shipping and return policy for your
          convenience.
        </motion.p>

        {/* Shipping Policy Section */}
        <motion.div
          className="border border-gray-300 rounded-lg p-6 mb-8"
          variants={sectionVariants}
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Shipping Policy
          </h2>
          <p className="text-gray-700 mb-4 text-sm md:text-md">
            We ship worldwide with reliable carriers. Here’s what you need to
            know:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-md">
            <li>Domestic (USA): 3-7 business days</li>
            <li>International: 7-21 business days</li>
          </ul>
          <p className="text-gray-700 mt-4 text-sm md:text-md">
            Shipping costs are calculated at checkout and vary by location.
            Orders are processed within 1-2 business days.
          </p>
        </motion.div>

        {/* Return Policy Section */}
        <motion.div
          className="border border-gray-300 rounded-lg p-6"
          variants={sectionVariants}
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Return Policy
          </h2>
          <p className="text-gray-700 mb-4 text-sm md:text-md">
            We want you to love your purchase. If you&apos;re not satisfied, we
            offer a hassle-free return policy. Items can be returned within 30
            days of receipt if they meet the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-md">
            <li>
              Items must be unworn, unwashed, and in their original condition.
            </li>
            <li>Original tags must still be attached.</li>
            <li>Items must include the original packaging.</li>
          </ul>
          <p className="text-gray-700 mt-4 text-sm md:text-md">
            To initiate a return, please email our support team at{" "}
            <a
              href="mailto:support@aristovlt.com"
              className="text-zinc-800 font-extrabold underline hover:text-zinc-400"
            >
              aristovlt.info@gmail.com
            </a>
            . Refunds will be processed within 7-10 business days after we
            receive the returned items.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SalesPolicyClient;

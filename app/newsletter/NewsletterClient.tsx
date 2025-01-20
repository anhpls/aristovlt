"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const NewsletterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [status, setStatus] = useState(""); // For success/error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(""); // Clear previous status

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-extrabold text-neutral-800 mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join Our Newsletter
        </motion.h1>
        <motion.p
          className="text-sm text-neutral-600 mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Stay updated with the latest releases, exclusive offers, and receive a{" "}
          <strong>10% discount</strong> on your first order.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900"
            required
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
          <motion.input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900"
            required
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900"
            required
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.button
              type="submit"
              className="w-full bg-stone-800 text-white py-2 rounded-lg font-semibold hover:bg-stone-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </form>

        {/* Status Messages */}
        {status === "success" && (
          <motion.p
            className="text-green-600 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Thank you for subscribing!
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            className="text-red-600 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Something went wrong. Please try again.
          </motion.p>
        )}

        {/* Benefits Section */}
        <motion.div
          className="mt-8 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="text-lg font-bold text-neutral-800 mb-4">
            Why Join Our Newsletter?
          </h2>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li>🌟 Early access to new collections and launches.</li>
            <li>🎉 Exclusive discounts and promo codes.</li>
            <li>🛍 Special holiday offers.</li>
            <li>💌 Personalized content tailored for you.</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NewsletterPage;

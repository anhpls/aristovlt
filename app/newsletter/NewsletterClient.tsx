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
        body: JSON.stringify(formData), // Send form data to the API
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "" }); // Clear input fields
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        className="bg-stone-200 rounded-lg shadow-md p-8 w-full max-w-lg text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 className="text-3xl font-bold text-gray-800 mb-4">
          Join Our Newsletter
        </motion.h1>
        <p className="text-gray-600 text-sm mb-6">
          Stay updated with the latest releases, exclusive offers, and receive a{" "}
          <strong>10% discount</strong> on your first order.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full font-medium mb-4"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full font-medium mb-4"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full font-medium mb-4"
            required
          />
          <motion.button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300 font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </form>

        {status === "success" && (
          <p className="text-green-600 mt-4">Thank you for subscribing!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4">Something went wrong. Try again.</p>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 ">
            Why Join Our Newsletter?
          </h2>
          <ul className="text-left text-gray-600 space-y-2 ">
            <li>🌟 Early access to new collections and launches.</li>
            <li>🎉 Exclusive discounts and promo codes.</li>
            <li>🛍 Special holiday offers.</li>
            <li>💌 Personalized content tailored for you.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsletterPage;

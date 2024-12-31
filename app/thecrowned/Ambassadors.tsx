"use client";

import { motion } from "framer-motion";
import React from "react";

const MembershipPerks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const perkVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const perks = [
    {
      title: "Exclusive Early Access",
      description: "Get early access to new collections before anyone else.",
      icon: "/icons/early-access.svg",
    },
    {
      title: "Member-Only Discounts",
      description:
        "Enjoy exclusive discounts on every drop and seasonal sales.",
      icon: "/icons/discounts.svg",
    },
    {
      title: "VIP Events",
      description: "Invitation to members-only virtual and in-person events.",
      icon: "/icons/events.svg",
    },
    {
      title: "Free Gifts",
      description:
        "Receive free items with select purchases and special drops.",
      icon: "/icons/free-gifts.svg",
    },
    {
      title: "Custom Packaging",
      description:
        "Your orders will arrive in premium, members-only packaging.",
      icon: "/icons/packaging.svg",
    },
  ];

  return (
    <motion.section
      className="bg-gradient-to-b from-gray-100 to-white py-16 px-8 md:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-gray-800">
          Membership Perks
        </h2>
        <p className="text-gray-600 mt-4">
          Discover the exclusive benefits of joining the Aristo Vault Club.
        </p>
      </motion.div>

      {/* Perks */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10"
        variants={containerVariants}
      >
        {perks.map((perk, index) => (
          <motion.div
            key={index}
            variants={perkVariants}
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="w-16 h-16 mb-4"
            >
              <img src={perk.icon} alt={perk.title} className="w-full h-full" />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800">{perk.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-2">{perk.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default MembershipPerks;

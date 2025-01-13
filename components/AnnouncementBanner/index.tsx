"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGift } from "react-icons/fa";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  const bannerMessage = process.env.NEXT_PUBLIC_BANNER_MESSAGE || "";
  const bannerEnabled = process.env.NEXT_PUBLIC_BANNER_ENABLED === "true";

  useEffect(() => {
    const bannerDismissed = sessionStorage.getItem("bannerDismissed");
    if (!bannerDismissed && bannerEnabled) {
      setIsVisible(true);
    }
  }, [bannerEnabled]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("bannerDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-4 lg:right-4 bg-stone-800 text-white py-3 px-4 rounded-lg shadow-lg z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <FaGift className="text-rose-400 text-xl" />

        {/* Message */}
        <div className="text-sm font-medium">{bannerMessage}</div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-300 text-lg font-bold"
          aria-label="Close Banner"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default AnnouncementBanner;

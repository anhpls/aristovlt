"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What is AristoVLT?",
    answer:
      "AristoVLT is a clothing brand that combines vintage aesthetics with modern sophistication.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can track your order using the 'Track Your Order' page by entering your order ID.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unworn and unwashed items. Please visit our Returns page for more details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we offer worldwide shipping. Shipping fees and delivery times vary by location.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us via email at aristovlt.info@gmail.com or through the Contact Us page on our website.",
  },
];

const FAQClient: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const answerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-12">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-4xl font-bold text-gray-800 mb-10 text-center"
      >
        Frequently Asked Questions
      </motion.h1>
      <motion.div
        className="w-full max-w-3xl space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium bg-gray-50 text-gray-800"
            >
              <span>{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-gray-500"
              >
                +
              </motion.span>
            </button>
            <motion.div
              initial="hidden"
              animate={openIndex === index ? "visible" : "hidden"}
              variants={answerVariants}
              className="px-6 overflow-hidden bg-white text-gray-700"
            >
              <p className="py-4">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQClient;

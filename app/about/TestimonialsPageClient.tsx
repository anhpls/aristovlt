"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TestimonialPage = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const teamVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const testimonialsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="min-h-screen  px-8 py-16">
      {/* Header Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600 mt-4">
          Discover the story behind our brand and the team that makes it happen.
        </p>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="flex flex-col md:flex-row items-center gap-12 mb-20"
      >
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 mt-4">
            At our core, we believe in creating premium products that inspire
            confidence, elegance, and style. From the beginning, our mission has
            been to redefine sophistication through our timeless designs.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/images/placeholder.png"
            alt="About Us"
            width={500}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Alice", "Bob", "Charlie"].map((name, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={teamVariants}
              className="flex flex-col items-center text-center"
            >
              <Image
                src="/images/placeholder.png"
                alt={name}
                width={150}
                height={150}
                className="rounded-full shadow-md"
              />
              <p className="mt-4 text-lg font-bold text-gray-800">{name}</p>
              <p className="text-sm text-gray-600">Role {i + 1}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "This is the best brand I've ever bought from!",
            "The quality and style are unmatched.",
            "Highly recommend to anyone looking for elegance.",
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={testimonialsVariants}
              className="p-6 bg-white shadow-md rounded-lg"
            >
              <p className="text-gray-600 italic">&quot;{testimonial}&quot;</p>
              <p className="mt-4 text-right font-bold text-gray-800">
                - Customer {i + 1}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialPage;

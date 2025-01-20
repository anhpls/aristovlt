"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const AboutPage = () => {
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: 0.2, staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-stone-200 to-stone-300 py-16 px-4 md:px-16">
      {/* Header Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-16"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-neutral-800"
          variants={itemVariants}
        >
          About Us
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-neutral-600 mt-4"
          variants={itemVariants}
        >
          Where timeless elegance meets modern craftsmanship.
        </motion.p>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Left Section */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
            Redefining Style with Purpose
          </h2>
          <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
            At AristoVLT, we are more than just a brand; we are a movement. Our
            designs blend sophistication with authenticity, empowering you to
            express your individuality. From concept to creation, we prioritize
            quality, ensuring each piece is as timeless as it is innovative.
          </p>
          <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
            Join us in redefining fashion—where every detail, every thread, and
            every idea is crafted with purpose.
          </p>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md"
          variants={imageVariants}
        >
          <Image
            src="/images/placeholder.png"
            alt="Crafting Elegance"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        className="mt-20 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 mb-8">
          Our Mission
        </h2>
        <p className="text-lg md:text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed">
          To inspire confidence and empower individuality through thoughtfully
          designed, premium-quality fashion. At AristoVLT, every creation is an
          ode to the art of style, designed to transcend trends and celebrate
          the essence of who you are.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="mt-20 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 mb-12">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Team Member 1 */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            variants={itemVariants}
          >
            <Image
              src="/images/placeholder.png"
              alt="Alex Johnson"
              width={150}
              height={150}
              className="rounded-full shadow-md"
            />
            <p className="font-semibold text-lg text-neutral-800">
              Alex Johnson
            </p>
            <p className="text-sm text-neutral-600">Creative Director</p>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            variants={itemVariants}
          >
            <Image
              src="/images/placeholder.png"
              alt="Samantha Lee"
              width={150}
              height={150}
              className="rounded-full shadow-md"
            />
            <p className="font-semibold text-lg text-neutral-800">
              Samantha Lee
            </p>
            <p className="text-sm text-neutral-600">Lead Designer</p>
          </motion.div>

          {/* Team Member 3 */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            variants={itemVariants}
          >
            <Image
              src="/images/placeholder.png"
              alt="Michael Smith"
              width={150}
              height={150}
              className="rounded-full shadow-md"
            />
            <p className="font-semibold text-lg text-neutral-800">
              Michael Smith
            </p>
            <p className="text-sm text-neutral-600">Marketing Strategist</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;

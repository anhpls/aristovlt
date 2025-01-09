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
    <div className="bg-white h-screen w-full">
      <motion.div
        className="min-h-screen text-neutral-800 py-16 px-4 md:px-16 mt-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-neutral-600">
            We are on a journey to redefine elegance and style.
          </p>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
        >
          {/* Left Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h2 className="text-2xl md:text-4xl font-semibold">
              Crafting Elegance with Purpose
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              Our brand is built on the foundation of sophistication, blending
              timeless designs with modern aesthetics. Each piece we create is
              designed to empower and inspire confidence, whether you are
              exploring new horizons or making an impression closer to home.
            </p>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              From premium materials to meticulous craftsmanship, we aim to
              deliver quality that stands the test of time. Join us on this
              journey as we explore the essence of luxury.
            </p>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="relative w-full h-64 md:h-96"
            variants={imageVariants}
          >
            <Image
              src="/images/placeholder.png"
              alt="About Us"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInVariants}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div
              className="flex flex-col items-center space-y-4"
              variants={itemVariants}
            >
              <Image
                src="/images/placeholder.png"
                alt="Team Member 1"
                width={150}
                height={150}
                className="rounded-full"
              />
              <p className="font-medium text-xl">Alex Johnson</p>
              <p className="text-sm text-neutral-600">Creative Director</p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              className="flex flex-col items-center space-y-4"
              variants={itemVariants}
            >
              <Image
                src="/images/placeholder.png"
                alt="Team Member 2"
                width={150}
                height={150}
                className="rounded-full"
              />
              <p className="font-medium text-xl">Samantha Lee</p>
              <p className="text-sm text-neutral-600">Lead Designer</p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              className="flex flex-col items-center space-y-4"
              variants={itemVariants}
            >
              <Image
                src="/images/placeholder.png"
                alt="Team Member 3"
                width={150}
                height={150}
                className="rounded-full"
              />
              <p className="font-medium text-xl">Michael Smith</p>
              <p className="text-sm text-neutral-600">Marketing Strategist</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;

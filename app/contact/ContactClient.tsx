"use client";

import { motion } from "framer-motion";

const ContactPageClient = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 text-gray-800 flex flex-col items-center p-8 pt-28">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600">
          Reach out to us with your queries, feedback, or collaboration ideas.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-center gap-12 w-full max-w-6xl">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-gray-50 p-8 rounded-lg shadow-lg w-full md:w-1/2"
        >
          <form className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-gray-500"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gray-700 py-3 rounded-md text-white font-semibold hover:bg-gray-600 transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-gray-50 p-8 rounded-lg shadow-lg w-full md:w-1/2"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10l9-7 9 7-9 7-9-7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 21V9l3-2 3 2v12"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Our Office</h4>
                <p className="text-gray-600">
                  123 Aristo Blvd, Los Angeles, CA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26c.63.42 1.47.42 2.1 0L21 8m-9 13V5"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-gray-600">support@aristovlt.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Scroll Section */}
      <div className="mt-12">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="bg-gray-100 p-6 mb-6 rounded-lg shadow-md max-w-4xl mx-auto"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              Section {index + 1}
            </h2>
            <p className="text-gray-600 mt-2">
              This is a placeholder for additional infinite scroll content.
              Customize this content as needed.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactPageClient;

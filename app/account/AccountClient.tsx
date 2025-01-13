"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Mock data for orders, saved payment methods, and favorited items
const mockOrders = [
  {
    id: 1,
    date: "2023-12-15",
    total: "$120.00",
    items: 3,
  },
  {
    id: 2,
    date: "2023-11-10",
    total: "$89.50",
    items: 2,
  },
];

const mockPayments = [
  {
    id: 1,
    cardType: "Visa",
    last4: "1234",
    expiry: "12/25",
  },
  {
    id: 2,
    cardType: "MasterCard",
    last4: "5678",
    expiry: "08/24",
  },
];

const mockFavorites = [
  {
    id: 1,
    name: "Product 1",
    image: "/images/product1.jpg",
    price: "$40.00",
  },
  {
    id: 2,
    name: "Product 2",
    image: "/images/product2.jpg",
    price: "$60.00",
  },
];

const AccountPage = () => {
  interface Order {
    id: number;
    date: string;
    total: string;
    items: number;
  }
  
  interface PaymentMethod {
    id: number;
    cardType: string;
    last4: string;
    expiry: string;
  }
  
  interface FavoriteItem {
    id: number;
    name: string;
    image: string;
    price: string;
  }
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setOrders(mockOrders);
    setPaymentMethods(mockPayments);
    setFavorites(mockFavorites);
  }, []);

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Account
      </motion.h1>

      {/* Previous Orders Section */}
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold mb-4">Previous Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className="p-4 bg-white rounded-lg shadow-md"
              variants={itemVariants}
            >
              <p className="text-lg font-medium">Order ID: {order.id}</p>
              <p>Date: {order.date}</p>
              <p>Total: {order.total}</p>
              <p>Items: {order.items}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Saved Payment Methods Section */}
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold mb-4">Saved Payment Methods</h2>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              className="p-4 bg-white rounded-lg shadow-md"
              variants={itemVariants}
            >
              <p className="text-lg font-medium">{method.cardType}</p>
              <p>Ending in: {method.last4}</p>
              <img
                src={method.image}
                alt={method.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

      {/* Favorited Items Section */}
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold mb-4">Favorited Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <motion.div
              key={item.id}
              className="p-4 bg-white rounded-lg shadow-md"
              variants={itemVariants}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <p className="text-lg font-medium">{item.name}</p>
              <p>{item.price}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AccountPage;

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface SavedItem {
  id: number;
  name: string;
  link: string;
}

interface Order {
  id: number;
  totalAmount: number;
  createdAt: string;
}

const Account: React.FC = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user info
        const userResponse = await axios.get("/api/auth/login");
        console.log("User Response:", userResponse.data);
        setUser(userResponse.data);

        // Fetch saved items
        const savedItemsResponse = await axios.get("/api/items/save");
        console.log("Saved Items Response:", savedItemsResponse.data);
        setSavedItems(savedItemsResponse.data);

        // Fetch orders
        const ordersResponse = await axios.get("/api/orders/view");
        console.log("Orders Response:", ordersResponse.data);
        setOrders(ordersResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching account data:", err);
        setError("Failed to load account information.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-2xl font-semibold mb-2">Account Information</h2>
        <p>
          <span className="font-semibold">Name:</span> {user.name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email || "N/A"}
        </p>
      </motion.div>

      {/* Saved Items */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Saved Items</h2>
        {savedItems.length > 0 ? (
          <ul className="space-y-2">
            {savedItems.map((item) => (
              <li key={item.id}>
                <a href={item.link} className="text-blue-500 hover:underline">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved items yet.</p>
        )}
      </motion.div>

      {/* Past Orders */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border-t pt-2">
                <p>
                  <span className="font-semibold">Order ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-semibold">Total Amount:</span> $
                  {order.totalAmount.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No past orders found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Account;

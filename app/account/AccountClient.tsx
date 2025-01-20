"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AccountClient = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [savedItems, setSavedItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const logout = React.useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/account/login");
  }, [router]);

  useEffect(() => {
    const validateToken = () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const expiry =
        localStorage.getItem("expiry") || sessionStorage.getItem("expiry");

      if (!token || !expiry || new Date(expiry) < new Date()) {
        logout();
        return null;
      }
      return token;
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(""); // Clear any previous errors

        const token = validateToken();
        if (!token) return; // If no valid token, stop execution

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [userResponse, savedItemsResponse, ordersResponse] =
          await Promise.all([
            axios.get("/api/auth/user", config),
            axios.get("/api/items/save", config),
            axios.get("/api/orders/view", config),
          ]);

        setUser(userResponse.data);
        setSavedItems(savedItemsResponse.data);
        setOrders(ordersResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching account data:", err);

        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else {
          setError(
            axios.isAxiosError(err)
              ? err.response?.data?.message ||
                  "An error occurred while loading your account."
              : "An unexpected error occurred."
          );
        }
        logout();
      }
    };

    fetchData();
  }, [router, logout]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-stone-200">
        <p className="text-center font-extrabold text-neutral-700 text-3xl md:text-6xl lg:text-9xl flex justify-center items-center">
          <span>LOADING</span>
          <TypeAnimation
            sequence={[" ", 0, ".", 10, "..", 10, "...", 0]}
            wrapper="span"
            speed={1}
            repeat={Infinity}
            cursor={false}
            className="inline-block w-10 font-extrabold text-neutral-700"
          />
        </p>
      </div>
    );

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-200">
        <div className="text-center py-10 px-6 max-w-md bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-neutral-700 mb-6">{error}</p>
          <button
            onClick={() => router.push("/account/login")}
            className="bg-stone-800 text-white px-6 py-2 rounded-lg hover:bg-stone-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 max-w-6xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 py-44"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Little Hero Section  */}
      <motion.div
        className=""
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <h1 className="lg:text-6xl capitalize font-bold">
          {user.name} Account
        </h1>
      </motion.div>

      {/* Welcome Section */}
      <motion.div
        className="col-span-2 bg-white rounded-lg shadow-lg p-6 "
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-2xl font-bold mb-4 ">Welcome back, {user.name}!</h1>
        <p className="text-neutral-600">
          Manage your account, saved items, and orders below.
        </p>
      </motion.div>

      {/* Account Information */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {user.name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email || "N/A"}
        </p>
      </motion.div>

      {/* Saved Items */}
      <motion.div
        className="col-span-2 bg-white rounded-lg shadow-lg p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Saved Items</h2>
        {savedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedItems.map(
              (item: {
                id: string;
                name: string;
                link: string;
                image: string;
                price: number;
                description: string;
              }) => (
                <motion.div
                  key={item.id}
                  className="bg-gray-50 rounded-lg shadow-lg overflow-hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-neutral-600 text-sm mb-2">
                      {item.description}
                    </p>
                    <p className="text-xl font-semibold">${item.price}</p>
                    <a
                      href={item.link}
                      className="text-blue-500 hover:underline mt-2 inline-block"
                    >
                      View Item
                    </a>
                  </div>
                </motion.div>
              )
            )}
          </div>
        ) : (
          <p>No saved items yet.</p>
        )}
      </motion.div>

      {/* Past Orders */}
      <motion.div
        className="col-span-2 bg-white rounded-lg shadow-lg p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map(
              (order: {
                id: string;
                totalAmount: number;
                createdAt: string;
              }) => (
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
              )
            )}
          </ul>
        ) : (
          <p>No past orders found.</p>
        )}
      </motion.div>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </motion.div>
  );
};

export default AccountClient;

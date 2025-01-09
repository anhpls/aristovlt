"use client";

import React, { useState } from "react";

const TrackYourOrderClient: React.FC = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
    setError(null); // Reset error message when the user starts typing
  };

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError("Order ID cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (!response.ok) {
        throw new Error("Order not found. Please check your Order ID.");
      }
      const data = await response.json();
      setStatus(data.status);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
        />
        <button
          onClick={handleTrackOrder}
          disabled={loading}
          className={`w-full py-2 text-white rounded ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Tracking..." : "Track Order"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {status && (
          <p className="text-green-500 mt-2">Order Status: {status}</p>
        )}
      </div>
    </div>
  );
};

export default TrackYourOrderClient;

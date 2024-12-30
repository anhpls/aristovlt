"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { cart, isCartVisible, toggleCartVisibility, removeFromCart } =
    useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 z-50 cart-drawer ${
        isCartVisible ? "visible" : "hidden"
      }`}
    >
      <div className="p-4">
        <button
          className="text-red-500 font-bold mb-4 text-xl"
          onClick={toggleCartVisibility}
        >
          X
        </button>
        <h2 className="text-lg font-bold mb-4">Your Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li
                key={`${item.id}-${item.size}-${item.color}-${index}`} // Ensure a unique key for size and color
                className="flex justify-between py-2 border-b"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (item.size && item.color) {
                      removeFromCart(item.id, item.size, item.color); // Pass size and color for removal
                    }
                  }}
                  className="text-red-500 text-sm font-medium"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

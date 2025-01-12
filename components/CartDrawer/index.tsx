"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { cart, isCartVisible, toggleCartVisibility, removeFromCart } =
    useCart();

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      const cartElement = document.getElementById("cart-drawer");
      if (cartElement && !cartElement.contains(event.target as Node)) {
        toggleCartVisibility();
      }
    },
    [toggleCartVisibility]
  );

  useEffect(() => {
    if (isCartVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isCartVisible, handleOutsideClick]);

  const handleCheckout = async () => {
    try {
      const shippingMethod = "standard"; // Replace with a dynamic value if applicable

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          shippingMethod, // Include shipping method
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cart`,
        }),
      });

      const data = await response.json();

      // Log the response for debugging
      console.log("API Response:", data);

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error(
          "Failed to create checkout session:",
          data.message || "No URL returned"
        );
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isCartVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={toggleCartVisibility}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        id="cart-drawer"
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform duration-300 z-50 cart-drawer overflow-y-scroll ${
          isCartVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <button
            className="text-red-500 font-bold text-xl"
            onClick={toggleCartVisibility}
          >
            X
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 flex flex-col space-y-4">
          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  className="flex items-start justify-between border-b pb-4"
                >
                  <div className="flex items-start space-x-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="object-cover rounded-lg border"
                    />

                    {/* Item Details */}
                    <div className="flex flex-col space-y-1 w-7/12">
                      <p className="font-medium text-sm text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Color:{" "}
                        {typeof item.color === "string"
                          ? item.color
                          : "Default"}
                      </p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm font-bold text-zinc-600">
                        {item.quantity > 1 ? (
                          <>
                            <span>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span>${item.price.toFixed(2)}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.size,
                        typeof item.color === "object"
                          ? item.color.title
                          : item.color,
                        item.title
                      )
                    }
                    className="text-red-500 text-sm font-medium hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          )}
        </div>

        {/* Subtotal and Checkout Section */}
        <div className="p-4 mt-auto border-t">
          {/* Subtotal */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-bold text-gray-800">Subtotal:</p>
            <p className="text-lg font-bold text-gray-800">
              $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>

          {/* Shipping Info */}
          <div className="mb-4">
            <p className="text-sm text-zinc-700 uppercase font-extrabold tracking-wider">
              Shipping:
            </p>
            <p className="text-sm text-neutral-600">Calculated at checkout</p>
          </div>

          {/* Checkout Button */}
          <button
            className="w-full py-3 bg-neutral-800 text-sm text-white font-semibold uppercase rounded-lg hover:bg-neutral-700 transition-colors duration-300"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;

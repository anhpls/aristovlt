"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CartItem = {
  id: string;
  title: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  isCartVisible: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  clearCart: () => void;
  toggleCartVisibility: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color // Ensure size and color are both considered
      );

      if (existingItem) {
        // Update the quantity for the matching item
        return prevCart.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      // Add a new item if it doesn't exist in the cart
      return [...prevCart, item];
    });

    // Trigger the toast notification
    toast.success(`${item.title} added to cart!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const removeFromCart = (id: string, size?: string, color?: string) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id && item.size === size && item.color === color
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartVisible,
        addToCart,
        removeFromCart,
        clearCart,
        toggleCartVisibility,
      }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

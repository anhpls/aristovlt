"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CartItem = {
  id: string;
  title: string;
  price: number;
  size?: string;
  color?: string | { title?: string; colors?: string[] };
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  isCartVisible: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    id: string,
    size?: string,
    color?: string | { title?: string; colors?: string[] },
    title?: string
  ) => void;
  clearCart: () => void;
  toggleCartVisibility: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Load cart from localStorage when the app initializes
  useEffect(() => {
    const storedCart = sessionStorage.getItem("shoppingCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color &&
          cartItem.title === item.title
        // Ensure size and color are both considered
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

  const removeFromCart = (
    id: string,
    size?: string,
    color?: string | { title?: string; colors?: string[] },
    title?: string
  ) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          const isMatchingItem =
            (item.id === id &&
              (item.size === size || (!size && !item.size)) &&
              (item.color === color || (!color && !item.color))) ||
            (item.title === title &&
              item.color === color &&
              item.size === size);

          if (isMatchingItem) {
            return { ...item, quantity: item.quantity - 1 }; // Decrement quantity
          }
          return item; // Return the item unchanged if not matched
        })
        .filter((item) => item.quantity > 0); // Remove items with 0 quantity

      return updatedCart;
    });
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

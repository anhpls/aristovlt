"use client";
import React, { useState } from "react";
import { CiInstagram } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";
import SubscribeButton from "../SubscribeButton";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // For success/error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail(""); // Clear the input field
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-stone-100">
      <footer className="text-gray-600 py-8 px-8 pt-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          {/* Left Section - Links */}
          <div className="space-y-2">
            <ul className="space-y-1">
              <li>
                <a href="/policy/trackorder" className="hover:underline">
                  Track Your Order
                </a>
              </li>
              {/* <li>
                <a href="/aristocracy" className="hover:underline">
                  Members
                </a>
              </li> */}
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Center Section - Policies */}
          <div className="space-y-2">
            <ul className="space-y-1">
              <li>
                <a href="/policy/FAQ" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/policy/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/policy/sales" className="hover:underline">
                  Shipping & Refund Policy
                </a>
              </li>
              <li>
                <a href="/policy/terms" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Newsletter and Social */}
          <div className="text-center md:text-right space-y-4">
            <p className="text-right">
              Subscribe to our newsletter and enjoy <strong>10% off</strong>{" "}
              your first order! <br />
              Be the first to know about new releases and exclusive offers.
            </p>
            <form
              className="flex flex-col md:flex-row items-center gap-2 justify-center md:justify-end"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto font-normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <SubscribeButton />
            </form>

            {status === "success" && (
              <p className="text-green-600 mt-2">
                Welcome to the AristoVLT family!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-2">
                Something went wrong. Please try again.
              </p>
            )}

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://www.instagram.com/aristovlt" target="_blank">
                <CiInstagram className="w-8 h-8 " />
              </a>
              <a href="https://tiktok.com/@aristovlt" target="_blank">
                <FaTiktok className="w-7 h-7 " />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm uppercase">
          &copy; {new Date().getFullYear()} AristoVLT. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

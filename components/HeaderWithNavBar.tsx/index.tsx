"use client";

import { useState } from "react";
import Header from "@/components/Header"; // Ensure Header is imported
import NavBar from "@/components/NavBar"; // Ensure NavBar is imported

const HeaderWithNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Overlay for click-out logic */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-30"
          onClick={closeMenu}
        ></div>
      )}

      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <NavBar isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default HeaderWithNavBar;

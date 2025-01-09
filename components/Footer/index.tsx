import React from "react";

export const Footer = () => {
  return (
    <div className="">
      <footer className="mt-8 text-stone-600 text-center py-10 ">
        &copy; {new Date().getFullYear()} AristoVLT. All rights reserved.
      </footer>
    </div>
  );
};

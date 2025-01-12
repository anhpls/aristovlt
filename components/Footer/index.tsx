import React from "react";

export const Footer = () => {
  return (
    <div className="">
      <footer className=" text-stone-600 text-center py-28">
        &copy; {new Date().getFullYear()} AristoVLT. All rights reserved.
      </footer>
    </div>
  );
};

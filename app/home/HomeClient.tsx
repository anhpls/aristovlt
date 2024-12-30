"use client";

import Image from "next/image";
import HeaderWithNavBar from "@/components/HeaderWithNavBar.tsx";

const HomeClient = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/homebg2.png"
          alt="Home Background"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          priority
        />
      </div>
      <HeaderWithNavBar />
    </div>
  );
};

export default HomeClient;

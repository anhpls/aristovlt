"use client";

import Image from "next/image";
import { memo } from "react";

const HomeClient = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/homebg2.png"
          alt="Home Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "top",
          }}
          priority
        />
      </div>
    </div>
  );
};

export default memo(HomeClient);

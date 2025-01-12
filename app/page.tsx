"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import CountdownTimer from "@/components/Countdown";
// import SubscribeButton from "@/components/SubscribeButton";

const LandingPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(false);
  // const [email, setEmail] = useState("");
  // const [status, setStatus] = useState(""); // For success/error messages

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("/api/subscribe", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (res.ok) {
  //       setStatus("success");
  //       setEmail(""); // Clear the input field
  //     } else {
  //       setStatus("error");
  //     }
  //   } catch (error) {
  //     console.error("Error subscribing to newsletter:", error);
  //     setStatus("error");
  //   }
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 1000); // 1-second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    const checkStoreStatus = async () => {
      try {
        const response = await fetch("/api/config");
        const { storeClosed, passwordProtection } = await response.json();

        if (storeClosed) router.push("/closed");
        if (!passwordProtection) router.push("/home");
      } catch (err) {
        console.error("Error checking store status:", err);
      }
    };

    checkStoreStatus();
  }, [router]);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/home");
      } else {
        const data = await response.json();
        setError(data.error || "Invalid password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/landing.png')" }} // image landing
    >
      {/* <video // video landing
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-40 "
        src="/images/trailer.mp4"
        autoPlay
        loop
        muted
        playsInline
      /> */}

      {showAnimation && (
        <TypeAnimation
          sequence={["ARISTO.VLT", 400, "ARISTO VAULT", 2000]}
          wrapper="span"
          speed={5}
          repeat={0}
          cursor={false}
          className="text-5xl md:text-7xl p-2  text-neutral-800 mb-6 font-black shadow-lg shadow-neutral-900 pointer-events-none "
        />
      )}

      <motion.input
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 3.8 }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Password"
        className="font-bold p-2 rounded-md text-black outline-neutral-900 drop-shadow-md placeholder-stone-900 border-opacity-65 border-1  placeholder-opacity-30"
      />
      <motion.button
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 3.8 }}
        onClick={handleLogin}
        type="submit"
        className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-full drop-shadow-md hover:bg-orange-500 transition-colors duration-500 hover:border-orange-100 border-2 border-transparent "
      >
        Enter
      </motion.button>
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* <form
        className="flex flex-col md:flex-row items-center gap-2 justify-center md:justify-end "
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border border-gray-200 rounded-md w-full md:w-auto font-normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <SubscribeButton />
      </form>

      {status === "success" && (
        <p className="text-green-600 mt-2">Welcome to the AristoVLT family!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-2">
          Something went wrong. Please try again.
        </p>
      )} */}

      <motion.div
        className="flex space-x-4 text-lg font-semibold absolute bottom-16 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0 }}
      >
        <CountdownTimer targetDate="2025-01-25T23:59:59" />
      </motion.div>
    </div>
  );
};

export default LandingPage;

"use client";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [hasMounted, setHasMounted] = useState(false); // Ensure client-side rendering
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Prevent rendering on the server
    setHasMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  if (!hasMounted) {
    return null;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex flex-col items-center justify-center text-center py-6  text-blackrounded-lg">
      <h2 className="text-xl font-bold mb-2"></h2>
      <div className="flex space-x-4 text-lg font-semibold">
        <div className="flex flex-col items-center">
          <span className="text-3xl">{days}</span>
          <span className="text-sm uppercase">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl">{hours}</span>
          <span className="text-sm uppercase">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl">{minutes}</span>
          <span className="text-sm uppercase">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl">{seconds}</span>
          <span className="text-sm uppercase">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

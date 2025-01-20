"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Account from "./AccountClient";

const AccountWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      sessionStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      // Redirect to login if not logged in
      router.push("/account/login");
    } else {
      // Set authenticated to true only if logged in
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    // Don't render anything until authentication check is complete
    return null;
  }

  return <Account />;
};

export default AccountWrapper;

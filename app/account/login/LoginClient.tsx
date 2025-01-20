"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, user } = await response.json();

        const saveLogin = (storage: Storage) => {
          const now = new Date();
          const expiry = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now

          storage.setItem("token", token);
          storage.setItem("isLoggedIn", "true");
          storage.setItem("userName", user.name);
          storage.setItem("expiry", expiry.toISOString());
        };

        if (rememberMe) {
          saveLogin(localStorage);
        } else {
          saveLogin(sessionStorage);
        }

        router.push("/account");
      } else {
        const data = await response.json();
        setError(data.error || "Wrong username or password. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen pb-44">
      <div className="w-full max-w-md bg-none p-6">
        <h1 className="text-xl font-semibold text-center mb-6 uppercase">
          account
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-neutral-600">
              Remember Me
            </label>
          </div>

          {error && (
            <div className="text-red-700 p-3 rounded mb-4">{error}</div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors duration-300 uppercase"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-8 text-sm ">
          <p className="text-neutral-600 ">
            Don&apos;t have an account?{" "}
            <a
              href="/account/register"
              className="text-white underline-offset-4 hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

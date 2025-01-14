"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPassword("");

        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push("/account/login");
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen pb-32">
      <div className="w-full max-w-md  p-6">
        <h1 className="text-xl font-semibold text-center mb-6 uppercase">
          Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>

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

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors duration-300 uppercase"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="text-center mt-8 text-sm">
          <p className="text-neutral-600">
            Already have an account?{" "}
            <a
              href="/account/login"
              className="text-white underline-offset-4 hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

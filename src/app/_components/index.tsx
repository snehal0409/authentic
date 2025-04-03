"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' in Next.js App Router

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Works correctly in App Router

  interface LoginResponse {
    message?: string;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/profile"); // Redirect after successful login
      } else {
        const data: LoginResponse = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="emailInput" className="block mb-1">Email</label>
          <input
            type="email"
            id="emailInput"
            value={email}
            onChange={handleChange(setEmail)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passwordInput" className="block mb-1">Password</label>
          <input
            type="password"
            id="passwordInput"
            value={password}
            onChange={handleChange(setPassword)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded mb-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}

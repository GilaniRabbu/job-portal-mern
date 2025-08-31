/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

export default function LoginForm() {
  const [userLogin, { isLoading }] = useLoginUserMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted:", formData);

    try {
      const res = await userLogin(formData).unwrap();
      console.log("Login success:", res);

      if (res.success) {
        toast.success(res.message);
        router.push("/jobs"); // ✅ redirect to jobs
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <section className="px-4 py-8 md:py-0 md:min-h-screen md:flex md:items-center md:justify-center bg-gray-100">
      <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
            <p
              onClick={() => router.push("/forgot-password")}
              className="mt-2 text-sm cursor-pointer text-orange-600 hover:underline"
            >
              Forgot password?
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

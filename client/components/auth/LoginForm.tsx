/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { Eye, Lock, Mail, X } from "lucide-react";
import { FaFacebookF, FaApple, FaXTwitter } from "react-icons/fa6";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import ContainerWrapper from "../common/ContainerWrapper";

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
        router.push("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <section className="py-10 lg:py-24">
      <ContainerWrapper className="flex justify-center items-center">
        <div className="bg-[#071400] rounded-2xl max-w-6xl w-full overflow-hidden shadow-lg">
          <div className="lg:flex">
            <div className="flex-1 p-12">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-bold mb-2 text-center text-white">
                  Login your account
                </h1>
                <p className="mb-8 text-center text-white">
                  Don't have an account?{" "}
                  <a href="#" className="text-[#05AF2B]">
                    Sign Up
                  </a>
                </p>
                <form className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="bg-none rounded-full border border-white/10 text-white pl-12 h-12 focus:outline-none focus:border-[#05AF2B]"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="bg-none rounded-full border border-white/10 text-white pl-12 h-12 focus:outline-none focus:border-[#05AF2B]"
                      required
                    />
                    <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 cursor-pointer hover:text-white" />
                  </div>
                  <div className="flex items-center flex-wrap gap-4 justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="border-white/50 data-[state=checked]:bg-[#05AF2B] data-[state=checked]:border-[#05AF2B]"
                      />
                      <label htmlFor="remember" className="text-sm text-white">
                        Remember Me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-white hover:text-[#05AF2B]"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className={`w-full cursor-pointer bg-[#05AF2B] hover:bg-green-600 text-white py-2.5 rounded-full transition-colors ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>

                  <div className="text-center">
                    <span className="text-white">or</span>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1 h-12 rounded-4xl border-none bg-black text-white"
                    >
                      <FaFacebookF />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1 h-12 rounded-4xl border-none bg-black text-white"
                    >
                      <FaApple />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1 h-12 rounded-4xl border-none bg-black text-white"
                    >
                      <FaXTwitter />
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex-1 relative p-4 lg:block hidden">
              <div className="h-full relative">
                <Image
                  src="/form-img.png"
                  alt="Office collaboration"
                  fill
                  className="object-cover rounded-r-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
}

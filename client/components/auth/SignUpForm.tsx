/* eslint-disable */
"use client";

import { useState } from "react";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ContainerWrapper from "../common/ContainerWrapper";
import { Input } from "../ui/input";
import { Eye, Lock, Mail } from "lucide-react";
import { FaFacebookF, FaApple, FaXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";
import Image from "next/image";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [createAccount, { isLoading }] = useCreateUserMutation();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const { confirmPassword, ...payload } = formData;
      const res = await createAccount(payload).unwrap();

      if (res.success) {
        toast.success(res.message || "Account created successfully!");
        router.push("/login");
      }
    } catch (err: any) {
      console.error("Sign Up error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="py-10 lg:py-24">
      <ContainerWrapper className="flex justify-center items-center">
        <div className="bg-[#071400] rounded-2xl max-w-5xl w-full overflow-hidden shadow-lg">
          <div className="lg:flex">
            <div className="flex-1 p-12">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-bold mb-2 text-center text-white">
                  Open your account
                </h1>
                <p className="mb-8 text-center text-white">
                  Already have an account?{" "}
                  <a href="/login" className="text-[#05AF2B]">
                    Sign in
                  </a>
                </p>
                <form className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="bg-none rounded-full border border-white/10 text-white pl-12 h-12 focus:outline-none focus:border-[#05AF2B]"
                      required
                    />
                  </div>

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

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="bg-none rounded-full border border-white/10 text-white pl-12 h-12 focus:outline-none focus:border-[#05AF2B]"
                      required
                    />
                    <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 cursor-pointer hover:text-white" />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full cursor-pointer bg-[#05AF2B] hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
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

                  <p className="text-xs text-white/70 text-center mt-4 mx-auto max-w-sm leading-relaxed">
                    By joining you agree to the{" "}
                    <a
                      href="#"
                      className="font-semibold underline text-[#05AF2B]"
                    >
                      Fiver Terms of Service
                    </a>{" "}
                    and to occasionally receive emails from us. Please read our{" "}
                    <a
                      href="#"
                      className="font-semibold underline text-[#05AF2B]"
                    >
                      Privacy Policy
                    </a>{" "}
                    to learn how we use your personal data.
                  </p>
                </form>
              </div>
            </div>

            <div className="flex-1 relative p-4 lg:block hidden">
              <div className="h-full relative">
                <Image
                  src="/form-img.png"
                  alt="Office collaboration"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
}

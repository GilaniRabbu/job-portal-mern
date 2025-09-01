"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ContainerWrapper from "../common/ContainerWrapper";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#071400]">
      <ContainerWrapper className="py-5 block lg:hidden relative z-50">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer text-white"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#071400] shadow-lg z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-[#05AF2B] border-b">
            <Logo />
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <div className="flex flex-col">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-[#05AF2B]"
              >
                BECAME A SELLER
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 mb-2 text-white"
              >
                LOGIN
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-full text-white bg-[#05AF2B]"
              >
                Registration
              </Link>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
};

export default MobileHeader;

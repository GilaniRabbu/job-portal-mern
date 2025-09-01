"use client";
import React from "react";
import Link from "next/link";
import ContainerWrapper from "../common/ContainerWrapper";
import { ChevronDown, LayoutGrid } from "lucide-react";
import Logo from "./Logo";

const DesktopHeader = () => {
  return (
    <div className="bg-[#071400]">
      <ContainerWrapper className="py-5 hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Logo />
            <button className="px-5 py-2 rounded-full border border-[#05AF2B] text-[#05AF2B] bg-white/5 xl:block hidden">
              <LayoutGrid className="inline-block mr-2" size={16} />
              Categories
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative w-xs p-2 rounded-lg bg-white/10">
              <button className="px-3 py-2 rounded-md text-white bg-white/20">
                Freelancer
                <ChevronDown className="inline-block ml-2" size={16} />
              </button>
            </div>
            <Link href="/login" className="px-3 py-2 text-[#05AF2B]">
              BECAME A SELLER
            </Link>
            <Link href="/login" className="px-3 py-2 text-white">
              LOGIN
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-full text-white bg-[#05AF2B]"
            >
              Registration
            </Link>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
};

export default DesktopHeader;

import React from "react";
import ContainerWrapper from "../common/ContainerWrapper";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Logo from "./Logo";

const Footer = () => {
  // Define the data for each section
  const sections = [
    {
      id: 1,
      title: "About",
      links: [
        { id: 1, text: "About Us", url: "#" },
        { id: 2, text: "Become Seller", url: "#" },
        { id: 3, text: "ProProJobs", url: "#" },
      ],
    },
    {
      id: 2,
      title: "Categories",
      links: [
        { id: 1, text: "Design & Creative", url: "#" },
        { id: 2, text: "Development & IT", url: "#" },
        { id: 3, text: "Music & Audio", url: "#" },
        { id: 4, text: "Programming & Tech", url: "#" },
      ],
    },
    {
      id: 3,
      title: "Support",
      links: [
        { id: 1, text: "Help & Support", url: "#" },
        { id: 2, text: "FAQ", url: "#" },
        { id: 3, text: "Contact Us", url: "#" },
        { id: 4, text: "Terms & Services", url: "#" },
      ],
    },
  ];

  // Social links data
  const socialLinks = [
    { icon: <Facebook size={20} />, url: "#" },
    { icon: <Instagram size={20} />, url: "#" },
    { icon: <Linkedin size={20} />, url: "#" },
  ];

  // Popular posts data
  const popularPosts = [
    {
      id: 1,
      date: "November 7, 2024",
      title: "Unveils the Best Canadian Cities for Biking",
      imageUrl: "/post-img.png",
    },
    {
      id: 2,
      date: "November 7, 2024",
      title: "Unveils the Best Canadian Cities for Biking",
      imageUrl: "/post-img.png",
    },
  ];

  return (
    <div className="bg-[#071400]">
      <ContainerWrapper className="py-10">
        <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-start">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-white text-balance">
              Reach Your Requirement Goals Right on Schedule
            </h2>
          </div>
          <div>
            <p className="mb-6 leading-relaxed text-gray-400">
              Sign up, complete your profile, and start browsing projects.
              Submit proposals and communicate with clients to get hired.
            </p>
            <button className="px-6 py-3 rounded-full font-semibold bg-[#05AF2B] text-white">
              Get Started
            </button>
          </div>
        </div>

        <div className="py-10 border-y border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Logo />
            </div>

            {/* Map through sections */}
            {sections.map((section) => (
              <div key={section.id}>
                <h3 className="font-semibold text-lg mb-6 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="p-2 rounded-full text-white/70 bg-white/10 hover:bg-[#05AF2B] transition-all"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Popular Posts Section */}
          <div>
            <h2 className="text-xl font-bold mb-2 text-white">
              Our Popular Post
            </h2>
            <div className="flex lg:flex-row flex-col gap-4">
              {popularPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex gap-5 lg:items-center lg:flex-row flex-col text-white overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={160}
                      height={80}
                      className="w-40 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="mb-1 text-white/80">{post.date}</p>
                    <h3 className="font-bold line-clamp-2">{post.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/20">
          <p className="text-center text-gray-400">
            © QuantumEdge Software INC. 2025. All rights reserved.
          </p>
        </div>
      </ContainerWrapper>
    </div>
  );
};

export default Footer;

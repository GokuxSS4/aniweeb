"use client";

import { useState, useEffect } from "react";

import { SearchBar } from "@/components/common/SearchBar";

export function NavBar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed z-50 transition-all duration-500 ease-in-out ${
        hasScrolled
          ? "bg-gradient-to-b from-black/60 to-[#010100]/70 backdrop-blur-[6px] border-b border-gray-700/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-[90%] mx-auto flex items-center justify-between py-4">
        <h1 className="text-white font-semibold text-xl">Aniweeb.tv</h1>
        <SearchBar/>       
      </div>
    </nav>
  );
}

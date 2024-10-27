"use client";

import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

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
      <div className="w-[90%] mx-auto flex items-center justify-between py-4 px-12">
        <h1 className="text-white font-semibold text-xl">Aniweeb.tv</h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search anime..."
            className="bg-slate-900/40 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:bg-slate-900/60
                     transition-all duration-300 hover:bg-slate-900/50"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );
}

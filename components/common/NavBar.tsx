"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { SearchBar } from "@/components/common/SearchBar";

import AniweebLogo from "@/public/icons/aniweeb-logo.png";

export function NavBar() {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

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

  const isNavBarMirroVisible =
    hasScrolled || isSearchInputVisible || pathname !== "/";

  return (
    <nav
      className={`w-full relative lg:fixed z-50 transition-all duration-500 ease-in-out ${
        isNavBarMirroVisible
          ? "bg-gradient-to-b from-black/60 to-[#010100]/70 backdrop-blur-[6px] border-b border-gray-700/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-[90%] mx-auto flex items-center justify-between py-2">
        <Link href="/">
            <Image
              src={AniweebLogo}
              alt={"Aniweeb Logo"}
              width={150}
              height={150}
            />
        </Link>

        <div className="hidden lg:flex lg:justify-end w-full">
          <SearchBar isCompitable={false} />
        </div>

        <div className="lg:hidden w-full flex justify-end">
          {isSearchInputVisible ? (
            <MdClear
              className="size-7 text-white cursor-pointer"
              onClick={() => setIsSearchInputVisible(false)}
            />
          ) : (
            <CiSearch
              className="size-7 text-white stroke-2 cursor-pointer"
              onClick={() => setIsSearchInputVisible(true)}
            />
          )}
        </div>
      </div>

      <div className="lg:hidden w-full flex justify-end">
        {isSearchInputVisible && <SearchBar isCompitable={true} />}
      </div>
    </nav>
  );
}

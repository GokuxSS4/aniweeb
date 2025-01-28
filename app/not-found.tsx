"use client";

import Image from "next/image";
import Link from "next/link";
import NotFoundImage from "@/assets/images/luffy.png";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="relative w-96 aspect-square overflow-hidden">
        <Image
          src={NotFoundImage}
          alt=""
          fill
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <h2 className="text-white text-2xl md:text-3xl font-bold">404 Error</h2>
      <p className="text-white mb-4 text-sm md:text-base">
        Oops! We can't find this page.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm md:text-base"
      >
        Back to homepage
      </Link>
    </div>
  );
}

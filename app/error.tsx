"use client";

import Image from "next/image";
import Link from "next/link";
import NotFoundImage from "@/assets/images/luffy.png";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="relative w-96 aspect-square overflow-hidden">
        <Image
          src={NotFoundImage}
          alt="Error illustration"
          fill
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <h2 className="text-white text-2xl md:text-3xl font-bold">
        Something went wrong
      </h2>
      <div className="space-y-2">
        <p className="text-white text-sm md:text-base">
          We encountered an unexpected error while processing your request.
        </p>
        <p className="text-white/80 text-sm">
          Our team has been notified and is working to fix the issue.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm md:text-base"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/10 transition-colors text-sm md:text-base"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

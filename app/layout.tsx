import React from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { NavBar } from "@/components/common/NavBar";
import { Footer } from "@/components/common/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";

import "./globals.css";

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aniweeb · Free  Anime Streaming",
    template: "%s · Aniweeb",
  },
  description:
    "Watch your favorite anime online in Dub or Sub format without registration on Aniweeb.",
  icons: {
    icon: "/icons/aniweeb-icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased overflow-x-hidden overflow-y-scroll bg-[#010100]`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

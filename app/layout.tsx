import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Roboto } from "next/font/google";

import { NavBar } from "@/components/common/NavBar";
import { Footer } from "@/components/common/Footer";

import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "600"],
});

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aniweeb · Free  Anime Streaming",
  description: "Streaming anime platfrom for hardcore anime fans",
  icons: {
    icon: "/icons/aniweeb_icon.svg",
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
        className={`${roboto.className} antialiased overflow-x-hidden overflow-y-scroll scroll-container bg-[#010100]`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

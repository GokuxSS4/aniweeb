import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Roboto } from "next/font/google";

import { NavBar } from "@/components/common/NavBar";
import { Footer } from "@/components/common/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

import "./globals.css";

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

const APP_NAME = "Aniweeb";
const APP_DEFAULT_TITLE = "Aniweeb";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Free Anime Streaming Platform";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  icons: {
    icon: "/icons/aniweeb_rounded.png",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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

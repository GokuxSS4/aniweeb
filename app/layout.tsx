import type { Metadata } from "next";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  title:
    "Aniweeb · Watch Free Anime Online · Stream Subbed & Dubbed Anime in HD",
  description: "Streaming anime platfrom for hardcore anime fans",
  icons: {
    icon: "icons/aniweeb_icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono antialiased overflow-x-hidden overflow-y-scroll scroll-container bg-gray-900">
        {children}
      </body>
    </html>
  );
}

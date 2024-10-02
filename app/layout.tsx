import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aniweeb · Watch Free Anime Online · Stream Subbed & Dubbed Anime in HD",
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
      <body className='font-sans antialiased overflow-x-hidden'>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aniweeb",
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
      <body className='font-sans antialiased'>{children}</body>
    </html>
  );
}

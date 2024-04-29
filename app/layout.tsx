import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/UI/Nav";
import { diatype } from "./fonts";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "MAUD, Part of Accenture song",
  description: "A Brand Identity Company",
  metadataBase: new URL("https://maud-website.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-TYTT67R84C" />
      <body className={`${diatype.className} antialiased text-maud-black `}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

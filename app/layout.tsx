import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import localFont from "next/font/local";

const unica = localFont({ src: "./assets/fonts/Unica77-Medium.otf" });

export const metadata: Metadata = {
  title: "Maud — Part of Accenture song",
  description: "A Brand Identity Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unica.className} antialiased text-maud-black`}>
        <Nav />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}

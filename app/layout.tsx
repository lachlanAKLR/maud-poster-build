import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/UI/Nav";
import { diatype } from "./fonts";

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
      <body className={`${diatype.className} antialiased text-maud-black`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

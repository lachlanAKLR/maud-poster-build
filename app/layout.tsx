import type { Metadata } from "next";
import "./globals.css";
import { unica } from "./fonts";
import Nav from "./components/UI/Nav";

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
      <body className={`${unica.className} antialiased text-maud-black`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

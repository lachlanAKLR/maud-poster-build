import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import { unica } from "./fonts";

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
      </body>
    </html>
  );
}

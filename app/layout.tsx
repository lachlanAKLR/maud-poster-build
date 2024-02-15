import type { Metadata } from "next";
import "./globals.css";
import { unica } from "./fonts";
import Nav from "./components/Nav";

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
        <link rel="icon" href="./favicon.gif" sizes="any" type="image/png" />
        <Nav />
        {children}
      </body>
    </html>
  );
}

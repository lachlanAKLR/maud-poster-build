import { Metadata } from "next";
import { diatype } from "../fonts";
import Nav from "../components/UI/Nav";

export const metadata: Metadata = {
  title: "MAUD, Work",
  description: "A Brand Identity Company",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${diatype.className} antialiased`}>
      <Nav />
      {children}
    </body>
  );
}

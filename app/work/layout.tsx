import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAUD, Work",
  description: "A Brand Identity Company",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

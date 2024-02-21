import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAUD — Info",
  description: "A Brand Identity Company",
};

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-maud-red min-h-screen">{children}</main>
    </>
  );
}

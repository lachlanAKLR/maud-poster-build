import Nav from "@/app/components/UI/Nav";
import { diatype } from "@/app/fonts";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={`${diatype.className} antialiased`}
      style={{
        overflow: "hidden",
      }}
    >
      <Nav />
      {children}
    </body>
  );
}

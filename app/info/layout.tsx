import Nav from "../components/Nav";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-maud-red min-h-screen">{children}</main>;
    </>
  );
}

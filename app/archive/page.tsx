import { getArchive } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import ClickGallery from "../components/UI/ClickGallery";
import SvgAnimation from "../components/UI/SvgAnimation";

export default async function Page() {
  const documents: ProfileType[] = await getArchive();

  return (
    <main className="bg-black overflow-hidden w-full h-full absolute top-0 left-0 z-10">
      <SvgAnimation />
      <ClickGallery documents={documents} />
    </main>
  );
}

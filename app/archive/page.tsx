import { ARCHIVE_QUERY, getArchive } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import ClickGallery from "../components/UI/ClickGallery";
import SvgAnimation from "../components/UI/SvgAnimation";
import { loadQuery } from "@/sanity/lib/store";
import { SanityDocument } from "next-sanity";

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(ARCHIVE_QUERY);

  return (
    <main className="bg-black overflow-hidden w-full h-full absolute top-0 left-0 z-10">
      <SvgAnimation />
      <ClickGallery documents={initial.data} />
    </main>
  );
}

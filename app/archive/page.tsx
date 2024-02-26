import { getArchive, getArchivePage } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import ClickGallery from "../components/UI/ClickGallery";
import { ArchivePageQueryResult } from "@/types";
import ArchiveAnimation from "../components/UI/ArchiveAnimation";
import SvgAnimation from "../components/UI/SvgAnimation";

export default async function Page() {
  const documents: ProfileType[] = await getArchive();
  const titleImages: ArchivePageQueryResult = await getArchivePage();

  return (
    <main className="bg-black overflow-hidden w-full h-full absolute top-0 left-0 z-10">
      {/* <ArchiveAnimation titleImages={titleImages} /> */}
      <SvgAnimation />
      <ClickGallery documents={documents} />
    </main>
  );
}

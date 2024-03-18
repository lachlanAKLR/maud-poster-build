import { ARCHIVE_QUERY } from "@/sanity/lib/queries";
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
      <div>
        <div className="flex flex-col group text-xs absolute bottom-0 left-0 text-white p-2 m-1 h-fit w-fit z-20">
          <span className="absolute bottom-6 mb-1 hidden group-hover:block tooltip rounded p-1.5 bg-white text-black w-[264px]">
            Click for images, click and hold to scale.
          </span>
          [ i ]
        </div>
      </div>
    </main>
  );
}

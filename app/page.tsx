import { ARCHIVE_QUERY } from "@/sanity/lib/queries";
import ClickGallery from "./components/UI/ClickGallery";
import { loadQuery } from "@/sanity/lib/store";
import { SanityDocument } from "next-sanity";

import React from "react";
import ScreenCapture from "./components/UI/ScreenCapture";

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(ARCHIVE_QUERY);

  return (
    <main className="bg-black overflow-hidden w-full h-full absolute top-0 left-0 z-10">
      <ScreenCapture documents={initial.data} />
    </main>
  );
}

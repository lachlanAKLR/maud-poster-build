import TitleAnimation from "./components/UI/TitleAnimation";
import { ProfileType } from "@/types";
import HomeVideo from "./components/UI/HomeVideo";
import { loadQuery } from "@/sanity/lib/store";
import { SanityDocument } from "next-sanity";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { getTags } from "@/sanity/lib/queries";
import { Tag } from "@/types";
import Footer from "./components/UI/Footer";
import { getSettings } from "@/sanity/lib/queries";
import ScrollDown from "./components/UI/ScrollDown";
import { getArchive } from "@/sanity/lib/queries";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";
import React from "react";

const HomeProjects = React.lazy(() => import("./components/UI/HomeProjects"));

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(PROJECTS_QUERY);
  const homeContent = await loadQuery<SanityDocument[]>(HOME_QUERY);
  const tags: Tag[] = await getTags();
  const settings: ProfileType[] = await getSettings();
  const documents: ProfileType[] = await getArchive();

  const hideAnimation = homeContent.data[0].hideAnimation;

  return (
    <div>
      <ScrollDown />
      {hideAnimation ? (
        <div className="w-full h-dvh md:h-screen absolute top-0 left-0 flex items-center justify-center pointer-events-none z-40 pb-0 md:pb-5">
          <h1 className={`text-2xl md:text-5xl text-white`}>MAUD</h1>
        </div>
      ) : (
        <TitleAnimation title="MAUD" intervalMs={300} />
      )}
      <p></p>
      <HomeVideo content={homeContent.data} />
      <Suspense fallback={<div>Loading</div>}>
        <HomeProjects
          projects={initial.data}
          tags={tags}
          isHome={true}
          documents={documents}
        />
      </Suspense>
      <Footer settings={settings} />
    </div>
  );
}

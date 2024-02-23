import TitleAnimation from "./components/UI/TitleAnimation";
import { ProfileType } from "@/types";
import { getHome } from "@/sanity/lib/queries";
import HomeVideo from "./components/UI/HomeVideo";
import { loadQuery } from "@/sanity/lib/store";
import { SanityDocument } from "next-sanity";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { getTags } from "@/sanity/lib/queries";
import { Tag } from "@/types";
import HomeProjects from "./components/UI/HomeProjects";
import Footer from "./components/UI/Footer";
import { getSettings } from "@/sanity/lib/queries";
import ScrollDown from "./components/UI/ScrollDown";

export default async function Page() {
  const content: ProfileType[] = await getHome();
  const initial = await loadQuery<SanityDocument[]>(PROJECTS_QUERY);
  const tags: Tag[] = await getTags();
  const settings: ProfileType[] = await getSettings();

  return (
    <div className="">
      <ScrollDown />
      <TitleAnimation title="MAUD" intervalMs={300} />
      <HomeVideo content={content} />
      <HomeProjects projects={initial.data} tags={tags} isHome={true} />
      <Footer settings={settings} />
    </div>
  );
}

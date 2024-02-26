import { SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { PROJECTS_QUERY, getTags } from "@/sanity/lib/queries";
import Projects from "../components/Projects/Projects";
import { Tag } from "@/types";
import Footer from "../components/UI/Footer";
import { getSettings } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { getArchive } from "@/sanity/lib/queries";

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(PROJECTS_QUERY);
  const tags: Tag[] = await getTags();
  const settings: ProfileType[] = await getSettings();
  const documents: ProfileType[] = await getArchive();

  return (
    <>
      <Projects
        projects={initial.data}
        tags={tags}
        isHome={false}
        documents={documents}
      />
      <Footer settings={settings} />
    </>
  );
}

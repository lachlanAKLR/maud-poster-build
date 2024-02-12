import { SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { PROJECTS_QUERY, getTags } from "@/sanity/lib/queries";
import Projects from "../components/Projects";
import { ProfileType, Tag } from "@/types";
import TagsFilter from "../components/TagsFilter";

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(PROJECTS_QUERY);
  const tags: Tag[] = await getTags();

  return (
    <>
      <Projects projects={initial.data} tags={tags} />;
    </>
  );
}

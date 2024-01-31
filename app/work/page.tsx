import { SanityDocument } from "next-sanity";

import { loadQuery } from "@/sanity/lib/store";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import Projects from "../components/Projects";

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(PROJECTS_QUERY);

  // return <Posts posts={initial.data} />;
  return <Projects projects={initial.data} />;
}

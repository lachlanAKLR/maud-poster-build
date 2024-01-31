import { QueryParams, SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import Project from "../components/Project";
import { client } from "@/sanity/lib/client";

export async function generateStaticParams() {
  const projects = await client.fetch<SanityDocument[]>(PROJECTS_QUERY);

  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default async function Page({ params }: { params: QueryParams }) {
  const initial = await loadQuery<SanityDocument>(PROJECT_QUERY, params, {
    // Because of Next.js, RSC and Dynamic Routes this currently
    // cannot be set on the loadQuery function at the "top level"
    // perspective: draftMode().isEnabled ? "previewDrafts" : "published",
  });

  return <Project project={initial.data} />;
}

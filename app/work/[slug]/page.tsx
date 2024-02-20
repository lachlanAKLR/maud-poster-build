import { QueryParams, SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import Project from "../../components/Project";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const initial = await loadQuery<SanityDocument>(PROJECT_QUERY, params, {});

  if (!initial)
    return {
      title: "Not Found",
      description: "The page is not found",
    };

  return {
    title: initial.data.title,
    description: initial.data.subtitle,
  };
}

export async function generateStaticParams() {
  const projects = await client.fetch<SanityDocument[]>(PROJECTS_QUERY);

  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default async function Page({ params }: { params: QueryParams }) {
  const initial = await loadQuery<SanityDocument>(PROJECT_QUERY, params, {});
  const projects = await client.fetch<SanityDocument[]>(PROJECTS_QUERY);
  const imageUrl = builder.image(initial.data.featuredImage).quality(100).url(); // Direct link to the image

  console.log(process.env.metadataBase, imageUrl);

  return <Project project={initial.data} projects={projects} />;
}

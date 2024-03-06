import { QueryParams, SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import Project from "../../components/Project/Project";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import Footer from "@/app/components/UI/Footer";
import { getSettings } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";

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
    title: `MAUD, ${initial.data.title}`,
    description: initial.data.subtitle,
    metadataBase: new URL("https://maud-website.vercel.app"),
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
  const settings: ProfileType[] = await getSettings();

  return (
    <>
      <Project project={initial.data} projects={projects} />
      <Footer settings={settings} />
    </>
  );
}

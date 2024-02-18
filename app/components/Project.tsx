import { PortableText } from "@portabletext/react";
import { SanityDocument } from "next-sanity";
import Layout from "./Layout";
import ProjectContent from "./ProjectContent";
import MoreProjects from "./MoreProjects";

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

export default function Project({
  project,
  projects,
}: {
  project: SanityDocument;
  projects: SanityDocument[];
}) {
  const { layouts, projectCredits, _id } = project;

  return (
    <main className="min-h-screen">
      <ProjectContent project={project} />
      {layouts ? <Layout layouts={layouts} /> : null}
      {projectCredits ? (
        <div className="block md:grid grid-cols-8 gap-x-20 px-20">
          <div className="pt-24 pb-14 md:pb-8 md:pt-32 col-start-3 col-span-4 text-center text-xs">
            <PortableText value={projectCredits} />
          </div>
        </div>
      ) : null}
      {/* @ts-ignore */}
      <MoreProjects projects={projects} id={_id} />
    </main>
  );
}

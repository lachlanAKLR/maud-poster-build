import { SanityDocument } from "next-sanity";
import ProjectContent from "./ProjectContent";
import MoreProjects from "./MoreProjects";
import ProjectLayoutsAndCredits from "./ProjectLayoutsAndCredits";

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
      <ProjectLayoutsAndCredits
        layouts={layouts}
        projectCredits={projectCredits}
      />
      <MoreProjects projects={projects} id={_id} />
    </main>
  );
}

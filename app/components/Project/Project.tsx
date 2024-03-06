"use client";

import { SanityDocument } from "next-sanity";
import ProjectContent from "./ProjectContent";
import MoreProjects from "./MoreProjects";
import MobileMoreProjects from "./MobileMoreProjects";
import ProjectLayouts from "./ProjectLayouts";
import useMediaQuery from "../Utilities/useMediaQuery";

export default function Project({
  project,
  projects,
}: {
  project: SanityDocument;
  projects: SanityDocument[];
}) {
  const { layouts, _id } = project;
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  return (
    <main className="min-h-screen relative z-[100] bg-white">
      <ProjectContent project={project} />
      <ProjectLayouts layouts={layouts} />
      {isSmallScreen ? (
        <MobileMoreProjects projects={projects} id={_id} />
      ) : (
        <MoreProjects projects={projects} id={_id} />
      )}
    </main>
  );
}

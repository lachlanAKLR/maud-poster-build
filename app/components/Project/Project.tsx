"use client";

import { SanityDocument } from "next-sanity";
import ProjectContent from "./ProjectContent";
import MoreProjects from "./MoreProjects";
import MobileMoreProjects from "./MobileMoreProjects";
import ProjectLayouts from "./ProjectLayouts";
import useMediaQuery from "../Utilities/useMediaQuery";
import { Suspense } from "react";

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
      <Suspense fallback={<div>Loading layouts...</div>}>
        <ProjectLayouts layouts={layouts} />
      </Suspense>
      {isSmallScreen ? (
        <Suspense fallback={<div>Loading more projects...</div>}>
          <MobileMoreProjects projects={projects} id={_id} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading more projects...</div>}>
          <MoreProjects projects={projects} id={_id} />
        </Suspense>
      )}
    </main>
  );
}

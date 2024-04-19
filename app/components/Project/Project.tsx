"use client";

import { SanityDocument } from "next-sanity";
import ProjectContent from "./ProjectContent";
import useMediaQuery from "../Utilities/useMediaQuery";
import { Suspense } from "react";
import React from "react";

const ProjectLayouts = React.lazy(() => import("./ProjectLayouts"));
const MoreProjects = React.lazy(() => import("./MoreProjects"));
const MobileMoreProjects = React.lazy(() => import("./MobileMoreProjects"));

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
      <Suspense fallback={<div>Loading</div>}>
        <ProjectLayouts layouts={layouts} />
      </Suspense>
      {isSmallScreen ? (
        <Suspense fallback={<div>Loading</div>}>
          <MobileMoreProjects projects={projects} id={_id} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading</div>}>
          <MoreProjects projects={projects} id={_id} />
        </Suspense>
      )}
    </main>
  );
}

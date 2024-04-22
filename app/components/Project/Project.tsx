"use client";

import { SanityDocument } from "next-sanity";
import ProjectContent from "./ProjectContent";
import useMediaQuery from "../Utilities/useMediaQuery";
import React from "react";
import { useState, Suspense, useEffect } from "react";

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
  const [applyClasses, setApplyClasses] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setApplyClasses(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`min-h-screen relative z-[100] bg-white ${
        applyClasses ? "h-screen overflow-hidden" : ""
      }`}
    >
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

"use client";

import { SanityDocument } from "next-sanity";
import ProjectContent from "./ProjectContent";
import MoreProjects from "./MoreProjects";
import MobileMoreProjects from "./MobileMoreProjects";
import ProjectLayouts from "./ProjectLayouts";
import { useState, useEffect } from "react";

// @ts-ignore
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export default function Project({
  project,
  projects,
}: {
  project: SanityDocument;
  projects: SanityDocument[];
}) {
  const { layouts, projectCredits, _id } = project;
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

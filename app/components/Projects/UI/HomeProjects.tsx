"use client";

import Projects from "../Projects";
import { SanityDocument } from "next-sanity";
import { Tag } from "@/types";
import { useEffect, useState } from "react";
import { ProfileType } from "@/types";

export default function HomeProjects({
  projects,
  tags,
  isHome,
  documents,
}: {
  projects: SanityDocument[];
  tags: Tag[];
  isHome: boolean;
  documents: ProfileType[];
}) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY >= window.innerHeight - 0;
      setIsFixed(shouldBeFixed);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHome]);

  return (
    <div
      className={`${
        isHome
          ? `w-full absolute top-[100vh] left-0 h-auto z-40 min-h-dvh md:min-h-screen ${
              isFixed ? "fixed top-0" : "fixed top-0"
            }`
          : " "
      }`}
    >
      <Projects
        projects={projects}
        tags={tags}
        isHome={isHome}
        documents={documents}
      />
    </div>
  );
}

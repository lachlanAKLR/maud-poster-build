"use client";

import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import TagsFilter from "../UI/TagsFilter";
import { Tag } from "@/types";
import SingleProjectThumb from "./SingleProjectThumb";
import TitleAnimation from "../UI/TitleAnimation";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Projects({
  projects,
  tags,
  isHome,
}: {
  projects: SanityDocument[];
  tags: Tag[];
  isHome: boolean;
}) {
  const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [isProjectFadeOut, setIsProjectFadeOut] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (selectedProjectId && isProjectFadeOut) {
    }
  }, [selectedProjectId, isProjectFadeOut, router]);

  const filteredProjects = selectedTagSlug
    ? projects.filter(
        (project) =>
          Array.isArray(project.tags) &&
          project.tags.some((tag) => tag.slug.current === selectedTagSlug)
      )
    : projects;

  const handleProjectSelect = (projectId: string, projectSlug: string) => {
    setSelectedProjectId(projectId);
    setTimeout(() => {
      setIsProjectFadeOut(true);
    }, 600);
  };

  return (
    <>
      {isHome ? null : <TitleAnimation title="WORK" intervalMs={300} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.25 }}
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: selectedProjectId ? 0 : 1 }}
        >
          <TagsFilter
            tags={tags}
            onSelectTag={setSelectedTagSlug}
            isHome={isHome}
          />
        </motion.div>
        <AnimatePresence mode="wait">
          <main className="bg-white relative top-0 h-auto z-0 grid grid-cols-4 md:grid-cols-6 gap-x-8 md:gap-x-24 gap-y-8 md:gap-y-24 px-8 md:px-24 pt-20 md:pt-44 pb-12 md:pb-72 content-center min-h-dvh md:min-h-screen">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: selectedProjectId
                      ? project._id !== selectedProjectId
                        ? 0
                        : isProjectFadeOut
                        ? 0
                        : 1
                      : 1,
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      delay: project._id === selectedProjectId ? 0.45 : 0,
                    },
                  }}
                  onClick={() =>
                    handleProjectSelect(project._id, project.slug.current)
                  }
                  className="cursor-pointer col-span-2 flex flex-col justify-center content-center"
                >
                  <SingleProjectThumb
                    key={index}
                    // @ts-ignore
                    project={project}
                    index={index}
                  />
                </motion.div>
              ))
            ) : (
              <div className="p-4 text-red-500">No projects found</div>
            )}
          </main>
          <div className="h-screen w-full bg-transparent" />
        </AnimatePresence>
      </motion.div>
    </>
  );
}

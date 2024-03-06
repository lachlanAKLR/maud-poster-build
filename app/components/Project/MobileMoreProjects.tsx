"use client";

import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import SingleProjectThumb from "../Projects/SingleProjectThumb";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { shuffleArray } from "../Utilities/shuffleArray";

const NoScrollBar = styled.div`
  *::-webkit-scrollbar {
    display: none;
  }

  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface MoreProjectsProps {
  id: string;
  projects: SanityDocument[];
}

export default function MoreProjects({ projects, id }: MoreProjectsProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [isProjectFadeOut, setIsProjectFadeOut] = useState<boolean>(false);

  const filterProjects = projects.filter((project) => project._id !== id);

  const [randProjects, setRandProjects] = useState(() =>
    shuffleArray(filterProjects)
  );

  useEffect(() => {
    if (selectedProjectId && isProjectFadeOut) {
    }
  }, [selectedProjectId, isProjectFadeOut]);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setTimeout(() => {
      setIsProjectFadeOut(true);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isProjectFadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="pt-10 md:pt-32 mb-40 min-h-dvh"
    >
      <div className="bg-white">
        <h3 className="text-center pt-10 md:text-sm">More Projects</h3>
        <AnimatePresence>
          <NoScrollBar>
            <div className="overflow-x-scroll flex content-center">
              <div className="flex gap-x-5 gap-y-24 px-5  content-center h-dvh">
                {randProjects.slice(0, 4).map((project, index) => (
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
                    onClick={() => handleProjectSelect(project._id)}
                    className="cursor-pointer col-span-2 flex flex-col justify-center content-center w-full h-4/6"
                  >
                    <div className="w-[75vw]">
                      {/* @ts-ignore */}
                      <SingleProjectThumb project={project} index={index} />
                      <p className="pt-1 text-xs">
                        <span className="uppercase mr-1">{project.title}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
                {randProjects.length === 0 && (
                  <div className="col-span-6 text-center">
                    No projects found
                  </div>
                )}
              </div>
            </div>
          </NoScrollBar>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

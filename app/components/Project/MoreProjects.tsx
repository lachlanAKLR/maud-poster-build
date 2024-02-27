"use client";

import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import SingleProjectThumb from "../Projects/SingleProjectThumb";
import { AnimatePresence, motion } from "framer-motion";

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
  const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];

      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const [randProjects, setRandProjects] = useState(() =>
    shuffle(filterProjects)
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
      className="pt-10 md:pt-32 mb-10"
    >
      <div className="">
        <h3 className="text-center pt-20 md:text-sm">More Projects</h3>
        <AnimatePresence>
          <div className="flex flex-col md:grid grid-cols-6 gap-x-20 gap-y-24 md:gap-y-72 pt-20 px-10 md:px-20 pb-36 content-center">
            {randProjects.slice(0, 3).map((project, index) => (
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
                className="cursor-pointer col-span-2 flex flex-col justify-center content-center"
              >
                <SingleProjectThumb project={project} index={index} />
              </motion.div>
            ))}
            {randProjects.length === 0 && (
              <div className="col-span-6 text-center">No projects found</div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// "use client";

// import { SanityDocument } from "next-sanity";
// import { useState } from "react";
// import TagsFilter from "./TagsFilter";
// import { Tag } from "@/types";
// import SingleProjectThumb from "./SingleProjectThumb";
// import TitleAnimation from "./TitleAnimation";
// import { AnimatePresence, motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// export default function Projects({
//   projects,
//   tags,
// }: {
//   projects: SanityDocument[];
//   tags: Tag[];
// }) {
//   const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
//     null
//   );
//   const router = useRouter();

//   const filteredProjects = selectedTagSlug
//     ? projects.filter(
//         (project) =>
//           Array.isArray(project.tags) &&
//           project.tags.some((tag) => tag.slug.current === selectedTagSlug)
//       )
//     : projects;

//   const handleProjectSelect = (projectId: string, projectSlug: string) => {
//     setSelectedProjectId(projectId);
//     setTimeout(() => {
//       router.push(`/work/${projectSlug}`);
//     }, 3000);
//   };

//   return (
//     <>
//       <TagsFilter tags={tags} onSelectTag={setSelectedTagSlug} />
//       <AnimatePresence mode="wait">
//         <main className="grid grid-cols-4 md:grid-cols-6 gap-x-8 md:gap-x-24 gap-y-8 md:gap-y-24 px-8 md:px-24 pt-20 md:pt-44 pb-12 md:pb-72 content-center">
//           <TitleAnimation title="WORK" intervalMs={300} />
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map((project, index) => {
//               return (
//                 <motion.div
//                   key={project._id}
//                   initial={{ opacity: 1 }}
//                   animate={{
//                     opacity:
//                       selectedProjectId && project._id !== selectedProjectId
//                         ? 0
//                         : 1,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     transition: {
//                       delay: project._id === selectedProjectId ? 1.5 : 0,
//                     },
//                   }}
//                   onClick={() =>
//                     handleProjectSelect(project._id, project.slug.current)
//                   }
//                   className="cursor-pointer col-span-2 flex flex-col justify-center content-center"
//                 >
//                   <SingleProjectThumb
//                     key={index}
//                     // @ts-ignore // T
//                     project={project}
//                     index={index}
//                   />
//                 </motion.div>
//               );
//             })
//           ) : (
//             <div className="p-4 text-red-500">No projects found</div>
//           )}
//         </main>
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import TagsFilter from "./TagsFilter";
import { Tag } from "@/types";
import SingleProjectThumb from "./SingleProjectThumb";
import TitleAnimation from "./TitleAnimation";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Projects({
  projects,
  tags,
}: {
  projects: SanityDocument[];
  tags: Tag[];
}) {
  const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [isProjectFadeOut, setIsProjectFadeOut] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (selectedProjectId && isProjectFadeOut) {
      // Wait for other projects to fade out before starting the selected project fade out
      // setTimeout(() => {
      //   router.push(`/work/${selectedProjectSlug}`); // Adjust variable name as necessary
      // }, 1500); // Adjust timing based on your fade out duration
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
    // Delay to start fade out of unselected projects
    setTimeout(() => {
      setIsProjectFadeOut(true); // This triggers the fade out for the selected project
    }, 750); // This should match the exit transition delay of unselected projects
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: selectedProjectId ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <TagsFilter tags={tags} onSelectTag={setSelectedTagSlug} />
      </motion.div>
      <AnimatePresence mode="wait">
        <main className="grid grid-cols-4 md:grid-cols-6 gap-x-8 md:gap-x-24 gap-y-8 md:gap-y-24 px-8 md:px-24 pt-20 md:pt-44 pb-12 md:pb-72 content-center">
          <TitleAnimation title="WORK" intervalMs={300} />
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
                    delay: project._id === selectedProjectId ? 0.5 : 0,
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
      </AnimatePresence>
    </>
  );
}

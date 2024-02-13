"use client";

import { SanityDocument } from "next-sanity";
import { useState } from "react";
import TagsFilter from "./TagsFilter";
import { Tag } from "@/types";
import SingleProjectThumb from "./SingleProjectThumb";
import TitleAnimation from "./TitleAnimation";

export default function Projects({
  projects,
  tags,
}: {
  projects: SanityDocument[];
  tags: Tag[];
}) {
  const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);

  const filteredProjects = selectedTagSlug
    ? projects.filter(
        (project) =>
          Array.isArray(project.tags) &&
          project.tags.some((tag) => tag.slug.current === selectedTagSlug)
      )
    : projects;

  return (
    <>
      <TagsFilter tags={tags} onSelectTag={setSelectedTagSlug} />
      <main className="grid grid-cols-4 md:grid-cols-6 gap-x-8 md:gap-x-24 gap-y-8 md:gap-y-72 px-8 md:px-24 pt-12 md:pt-72 pb-12 md:pb-72 content-center">
        <TitleAnimation title="WORK" intervalMs={300} />
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => {
            return (
              //@ts-ignore
              <SingleProjectThumb key={index} project={project} index={index} />
            );
          })
        ) : (
          <div className="p-4 text-red-500">No projects found</div>
        )}
      </main>
    </>
  );
}

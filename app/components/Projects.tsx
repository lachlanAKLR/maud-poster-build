"use client";

import { SanityDocument } from "next-sanity";
import { useState } from "react";
import PageAnimation from "./PageAnimation";
import TagsFilter from "./TagsFilter";
import { Tag } from "@/types";
import SingleProjectThumb from "./SingleProjectThumb";

const title = `WORK`;

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
      <main className="grid grid-cols-6 gap-x-20 gap-y-72 pt-72 px-20 pb-72 content-center">
        <PageAnimation title={title} />
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

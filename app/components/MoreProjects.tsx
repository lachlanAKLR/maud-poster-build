import { SanityDocument } from "next-sanity";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";

import Link from "next/link";
import Image from "next/image";

interface ProjectProps {
  project: SanityDocument;
}

const builder = imageUrlBuilder({ projectId, dataset });

function Project({ project }: ProjectProps) {
  return (
    <Link
      className="col-span-2 flex flex-col justify-center content-center"
      href={`/work/${project.slug.current}`}
      key={project._id}
    >
      <Image
        className={`object-cover bg-maud-grey ${
          project.thumbnailImage.ratio === "square"
            ? "aspect-[1/1]"
            : project.thumbnailImage.ratio === "landscape"
            ? "aspect-[3/2]"
            : "aspect-[2/3]"
        }`}
        src={builder.image(project.thumbnailImage).quality(100).url()}
        width={3000}
        height={3000}
        quality={100}
        alt={project.thumbnailImage.alt || ""}
        id={project.thumbnailImage.ratio}
      />
    </Link>
  );
}

interface MoreProjectsProps {
  id: string;
  projects: SanityDocument[];
}

export default function MoreProjects({ projects, id }: MoreProjectsProps) {
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
  const randProjects = shuffle(filterProjects);
  return (
    <div className="bg-maud-grey">
      <h3 className="text-center pt-20">More Projects</h3>
      <div className="grid grid-cols-6 gap-x-20 gap-y-72 pt-20 px-20 pb-36 content-center">
        {randProjects.slice(0, 3).map((project) => (
          <Project key={project._id} project={project} />
        ))}{" "}
        {randProjects.length === 0 && (
          <div className="col-span-6 text-center text-red-500">
            No projects found
          </div>
        )}
      </div>
    </div>
  );
}

import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";
import Video from "./Video";

import { dataset, projectId } from "@/sanity/env";
import PageAnimation from "./PageAnimation";

const builder = imageUrlBuilder({ projectId, dataset });
const title = `WORK`;

export default function Projects({ projects }: { projects: SanityDocument[] }) {
  return (
    <main className="grid grid-cols-6 gap-x-20 gap-y-72 pt-72 px-20 pb-72 content-center">
      <PageAnimation title={title} />
      {projects?.length > 0 ? (
        projects.map((project, index) => (
          <Link
            className="col-span-2 flex flex-col justify-center content-center "
            key={project._id}
            href={`/work/${project.slug.current}`}
          >
            {project.thumbnailImage && project.thumbnailImage.videoUrl ? (
              <Video videoUrl={project.thumbnailImage.videoUrl} />
            ) : project.thumbnailImage ? (
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
                priority={index >= 0 && index <= 2 ? true : false}
                blurDataURL="data:..."
                placeholder="blur"
              />
            ) : null}
          </Link>
        ))
      ) : (
        <div className="p-4 text-red-500">No projects found</div>
      )}
    </main>
  );
}

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";
import Layout from "./Layout";
import Video from "./Video";

import { dataset, projectId } from "@/sanity/env";
import MoreProjects from "./MoreProjects";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Project({
  project,
  projects,
}: {
  project: SanityDocument;
  projects: SanityDocument[];
}) {
  const { title, featuredImage, projectText, layouts, projectCredits, _id } =
    project;

  return (
    <main className="min-h-screen">
      {title && (
        <h1 className="py-28 md:py-20 px-3 md:px-10 font-black text-2xl md:text-3xl text-center">
          {title}
        </h1>
      )}
      {featuredImage && featuredImage.videoUrl ? (
        <div className="h-[90vh]">
          <Video
            videoUrl={featuredImage.videoUrl}
            poster={
              featuredImage
                ? builder.image(featuredImage).quality(50).url()
                : ""
            }
          />
        </div>
      ) : featuredImage ? (
        <Image
          className="w-full aspect-4/5 md:aspect-3/2 object-cover bg-maud-grey"
          src={builder.image(featuredImage).quality(100).url()}
          width={3000}
          height={3000}
          quality={100}
          alt={featuredImage.alt || ""}
          priority
          blurDataURL="data:..."
          placeholder="blur"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 100vw, 33vw"
        />
      ) : null}
      {projectText ? (
        <div className="block md:grid grid-cols-8 gap-x-20 px-3 md:px-20">
          <div className="py-24 md:py-72 indent-16 col-start-3 col-span-4 md:text-sm">
            <PortableText value={projectText} />
          </div>
        </div>
      ) : null}
      {layouts ? <Layout layouts={layouts} /> : null}
      {projectCredits ? (
        <div className="block md:grid grid-cols-8 gap-x-20 px-20">
          <div className="py-24 md:py-32 col-start-3 col-span-4 text-center text-xs">
            <PortableText value={projectCredits} />
          </div>
        </div>
      ) : null}
      <MoreProjects projects={projects} id={_id} />
      {/* <Tags tags={tags} /> */}
    </main>
  );
}

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Project({ project }: { project: SanityDocument }) {
  const { title, projectImage, projectText, heroImageTag } = project;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {title ? <h1>{title}</h1> : null}
      {projectImage ? (
        <Image
          className="w-1/3 rounded-lg"
          src={builder
            .image(projectImage)
            .width(1080)
            .height(1080)
            .quality(100)
            .url()}
          width={300}
          height={300}
          alt={heroImageTag || ""}
        />
      ) : null}
      {projectText ? <PortableText value={projectText} /> : null}
    </main>
  );
}

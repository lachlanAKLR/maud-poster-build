import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";
import Layout from "./Layout";

import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Project({ project }: { project: SanityDocument }) {
  const { title, projectImage, projectText, heroImageTag, layouts } = project;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {title ? <h1 className="text-xl py-10">{title}</h1> : null}
      {projectImage ? (
        <Image
          className="w-full rounded-lg aspect-4/3 object-cover bg-maud-brown"
          src={builder.image(projectImage).quality(100).url()}
          width={3000}
          height={3000}
          quality={100}
          alt={heroImageTag || ""}
        />
      ) : null}
      {projectText ? (
        <div className="py-10">
          <PortableText value={projectText} />
        </div>
      ) : null}
      {layouts ? <Layout layouts={layouts} /> : null}
    </main>
  );
}

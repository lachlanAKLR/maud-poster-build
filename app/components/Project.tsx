import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";
import Layout from "./Layout";

import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Project({ project }: { project: SanityDocument }) {
  const { title, featuredImage, projectText, layouts } = project;

  return (
    <main className="min-h-screen">
      {title ? (
        <h1 className="py-20 px-10 font-black text-xl text-center">{title}</h1>
      ) : null}
      {featuredImage ? (
        <Image
          className="w-full aspect-3/2 object-cover bg-maud-brown"
          src={builder.image(featuredImage).quality(100).url()}
          width={3000}
          height={3000}
          quality={100}
          alt={featuredImage.alt || ""}
        />
      ) : null}
      {projectText ? (
        <div className="grid grid-cols-8 gap-x-20 px-20">
          <div className="py-72 indent-16 col-start-3 col-span-4">
            <PortableText value={projectText} />
          </div>
        </div>
      ) : null}
      {layouts ? <Layout layouts={layouts} /> : null}
    </main>
  );
}

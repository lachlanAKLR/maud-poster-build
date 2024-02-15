"use client";

import Image from "next/image";
import Video from "./Video";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";
import { dataset, projectId } from "@/sanity/env";
import { PortableText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";

const builder = imageUrlBuilder({ projectId, dataset });

const titleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const featuredVariants = {
  initial: { y: 0, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 0, opacity: 0 },
};

export default function ProjectContent({
  project,
}: {
  project: SanityDocument;
}) {
  const { title, featuredImage, projectText } = project;
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={titleVariants}
          transition={{ duration: 2, delay: 0.25 }}
        >
          {title && (
            <h1 className="py-28 md:py-20 px-3 md:px-10 font-black text-2xl md:text-3xl text-center">
              {title}
            </h1>
          )}
        </motion.div>
      </AnimatePresence>
      {featuredImage && featuredImage.videoUrl ? (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={featuredVariants}
          transition={{ duration: 2, delay: 0.25 }}
          className="h-[90vh]"
        >
          <Video
            videoUrl={featuredImage.videoUrl}
            poster={
              featuredImage
                ? builder.image(featuredImage).quality(50).url()
                : ""
            }
          />
        </motion.div>
      ) : featuredImage ? (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={featuredVariants}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
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
        </motion.div>
      ) : null}
      {projectText ? (
        <div className="block md:grid grid-cols-8 gap-x-20 px-3 md:px-20">
          <div className="py-24 md:py-72 indent-16 col-start-3 col-span-4 md:text-sm">
            <PortableText value={projectText} />
          </div>
        </div>
      ) : null}
    </>
  );
}

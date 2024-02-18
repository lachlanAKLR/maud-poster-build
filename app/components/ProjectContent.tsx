"use client";

import Image from "next/image";
import Video from "./Video";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";
import { dataset, projectId } from "@/sanity/env";
import { PortableText } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const builder = imageUrlBuilder({ projectId, dataset });

const titleVariants = {
  initial: { y: "30vh", opacity: 1 },
  animate: { y: 0, opacity: 1 },
  exit: { opacity: 0 },
};

export default function ProjectContent({
  project,
}: {
  project: SanityDocument;
}) {
  const { title, featuredImage, projectText } = project;
  const [animationCompleted, setAnimationCompleted] = useState(false); // State to track if animation is completed

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          onAnimationComplete={() => {}}
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={titleVariants}
            transition={{
              duration: 0.75,
              delay: 1,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
            {title && (
              <h1 className="py-28 md:py-20 px-3 md:px-10 font-black text-2xl md:text-3xl text-center">
                {title}
              </h1>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.75, ease: [0.4, 0.0, 0.2, 1] }}
        onAnimationComplete={() => setAnimationCompleted(true)}
        className={`h-[90vh] ${animationCompleted ? "inline" : ""}`}
      >
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
      </motion.div>
    </>
  );
}
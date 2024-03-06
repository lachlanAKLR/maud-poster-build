"use client";

import React, { useEffect, useState } from "react";
import { ArchivePageQueryResult } from "@/types";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";

import Image from "next/image";

const builder = imageUrlBuilder({ projectId, dataset });

interface ArchiveAnimationProps {
  titleImages: ArchivePageQueryResult;
}

export default function ArchiveAnimation({
  titleImages,
}: ArchiveAnimationProps) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const imagesLength = titleImages[0]?.archiveTitleImages?.length || 0;

  useEffect(() => {
    if (imagesLength > 0) {
      const intervalId = setInterval(() => {
        setVisibleIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          if (nextIndex >= imagesLength) {
            clearInterval(intervalId);
            setTimeout(() => setAnimationDone(true), 0);
            return prevIndex;
          }
          return nextIndex;
        });
      }, 300);

      return () => clearInterval(intervalId);
    }
  }, [imagesLength]);

  if (animationDone) {
    return null;
  }

  const archiveTitleImages = titleImages[0]?.archiveTitleImages || [];

  return (
    <div className="relative w-full h-dvh md:h-full pointer-events-none">
      {archiveTitleImages.map((image, index) => (
        <div
          key={index}
          className={`absolute z-[80] w-2/5 pointer-events-none ${
            visibleIndex === index ? "opacity-100" : "opacity-0"
          } `}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            className="object-cover pointer-events-none"
            src={builder.image(image).quality(100).url()}
            width={3000}
            height={3000}
            quality={100}
            alt={`Image ${index}`}
            priority
            placeholder="empty"
            sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}

"use client";

import { ProfileType } from "@/types";
import { useState, useEffect } from "react";
import ArchiveThumb from "./ArchiveThumb";
import { motion } from "framer-motion";

interface ClickGalleryProps {
  documents: ProfileType[];
}

export default function ArchiveShow({ documents }: ClickGalleryProps) {
  const [animateSize, setAnimateSize] = useState(0); // Initial size is 0

  const shuffle = (array: ProfileType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [randArchive, setRandArchive] = useState<ProfileType[]>(() =>
    shuffle(documents).slice(0, 1)
  );

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimateSize((currentSize) => currentSize + 2);
      }, 5);
      const stopTimeout = setTimeout(() => {
        clearInterval(interval);
      }, 4000);
      return () => {
        clearInterval(interval);
        clearTimeout(stopTimeout);
      };
    }, 2000);

    return () => clearTimeout(startTimeout);
  }, []);

  const fadeOutVariants = {
    visible: { opacity: 1 },
    hidden: {
      opacity: 0,
      transition: { delay: 4, duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="visible"
      animate="hidden"
      variants={fadeOutVariants}
      className="pointer-events-none absolute top-0 left-0 w-full h-dvh md:h-screen flex center-content justify-center items-center"
    >
      {randArchive.map((data, index) => (
        <div key={index}>
          <ArchiveThumb
            // @ts-ignore
            data={data}
            index={index}
            dynamicWidth={animateSize}
          />
        </div>
      ))}
    </motion.div>
  );
}

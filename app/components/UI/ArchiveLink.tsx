"use client";

import React, { useEffect, useState } from "react";
import ArchiveThumb from "./ArchiveThumb";
import { ProfileType } from "@/types";
import Link from "next/link";

interface ClickGalleryProps {
  documents: ProfileType[];
}

export default function ArchiveLink({ documents }: ClickGalleryProps) {
  const shuffle = (array: ProfileType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [randArchive, setRandArchive] = useState<ProfileType[]>(() =>
    shuffle(documents).slice(0, 5)
  );
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  useEffect(() => {
    // Set the interval for the animation
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % randArchive.length);
    }, 300); // Adjust this value to make the animation faster or slower

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [randArchive.length]);

  return (
    <div className="pb-64 bg-white">
      <div className="relative w-full h-auto min-h-[400px] flex justify-center items-center ">
        <Link href="/archive">
          <p
            className="text-sm text-maud-red absolute z-[100]"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            View Archive
          </p>

          {randArchive.map((data, index) => (
            <div
              key={index}
              className={`absolute z-[80]" ${
                visibleIndex === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* @ts-ignore */}
              <ArchiveThumb data={data} index={index} dynamicWidth={200} />
            </div>
          ))}
        </Link>
      </div>
    </div>
  );
}

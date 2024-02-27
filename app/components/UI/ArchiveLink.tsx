"use client";

import React, { useEffect, useState } from "react";
import ArchiveThumb from "./ArchiveThumb";
import { ProfileType } from "@/types";
import Link from "next/link";

interface ClickGalleryProps {
  documents: ProfileType[];
}

export default function ArchiveLink({ documents }: ClickGalleryProps) {
  // @ts-ignore
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
  };

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
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % randArchive.length);
    }, 300);

    return () => clearInterval(intervalId);
  }, [randArchive.length]);

  return (
    <div className=" pb-32 md:pb-64 bg-white mb-40 md:mb-10">
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
              <ArchiveThumb
                // @ts-ignore
                data={data}
                index={index}
                dynamicWidth={isSmallScreen ? 150 : 300}
              />
            </div>
          ))}
        </Link>
      </div>
    </div>
  );
}

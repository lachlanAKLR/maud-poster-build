"use client";

import React, { useEffect, useState } from "react";
import ArchiveThumb from "./ArchiveThumb";
import { ProfileType } from "@/types";
import Link from "next/link";
import useMediaQuery from "../Utilities/useMediaQuery";
import { shuffleArray } from "../Utilities/shuffleArray";
import styled from "styled-components";

const RotateContainer = styled.div`
  @keyframes rotateXaxis {
    from {
      transform: rotate3d(0, 1, 1, 0deg);
    }
    to {
      transform: rotate3d(0, 1, 1, 360deg);
    }
  }

  .rotated {
    background-color: pink;
    animation: rotateXaxis 3s linear infinite;
  }
`;

interface ClickGalleryProps {
  documents: ProfileType[];
}

export default function ArchiveLink({ documents }: ClickGalleryProps) {
  const filteredDocuments = documents.filter(
    // @ts-ignore
    (data) => data.archiveImage.palette.dominant.background !== "#7c7c7c"
  );

  const [randArchive, setRandArchive] = useState<ProfileType[]>(() =>
    shuffleArray(filteredDocuments).slice(0, 10)
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
          <RotateContainer>
            <div className="rotated">
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
            </div>
          </RotateContainer>
        </Link>
      </div>
    </div>
  );
}

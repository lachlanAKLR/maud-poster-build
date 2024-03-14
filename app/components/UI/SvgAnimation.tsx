"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import A from "../../assets/images/A.svg";
import R from "../../assets/images/R.svg";
import C from "../../assets/images/C.svg";
import H from "../../assets/images/H.svg";
import I from "../../assets/images/I.svg";
import V from "../../assets/images/V.svg";
import E from "../../assets/images/E.svg";

const titleImages = [A, R, C, H, I, V, E];

export default function SvgAnimation() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= titleImages.length) {
          clearInterval(intervalId);
          setTimeout(() => setAnimationDone(true), 0);
          return prevIndex;
        }
        return nextIndex;
      });
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  if (animationDone) {
    return null;
  }

  return (
    <div className="relative w-full h-dvh md:h-full">
      {titleImages.map((imageSrc, index) => (
        <div
          key={`svg-animation-${index}`}
          className={`absolute z-[80] w-2/5 pointer-events-none flex flex-cols align-middle justify-center ${
            visibleIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            className="object-cover pointer-events-none"
            src={imageSrc}
            alt={`letter ${index}`}
          />
        </div>
      ))}
    </div>
  );
}

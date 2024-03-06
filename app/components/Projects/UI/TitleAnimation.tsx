"use client";

import React, { useEffect, useState } from "react";

interface PageAnimationProps {
  title: string;
  intervalMs: number;
}

const PageAnimation: React.FC<PageAnimationProps> = ({ title, intervalMs }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(-1);
  const [displayedLetter, setDisplayedLetter] = useState<string>("");
  const textColorClass = title === "MAUD" ? "text-white" : "text-black";

  useEffect(() => {
    const timeouts: number[] = [];

    const initiateAnimation = () => {
      for (let i = 0; i <= title.length; i++) {
        const timeout = setTimeout(() => {
          setCurrentLetterIndex(i);
          if (title === "MAUD" && i === title.length) {
            setCurrentLetterIndex(-1);
            initiateAnimation();
          }
        }, i * intervalMs) as unknown as number;
        timeouts.push(timeout);
      }
    };

    initiateAnimation();

    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [title, intervalMs]);

  useEffect(() => {
    if (currentLetterIndex >= 0 && currentLetterIndex < title.length) {
      setDisplayedLetter(title.charAt(currentLetterIndex));
    } else if (title !== "MAUD") {
      setDisplayedLetter("");
    }
  }, [currentLetterIndex, title]);

  return (
    <div className="w-full h-dvh md:h-screen absolute top-0 left-0 flex items-center justify-center pointer-events-none z-40 pb-0 md:pb-5">
      <h1 className={`text-5xl md:text-6xl ${textColorClass}`}>
        {displayedLetter}
      </h1>
    </div>
  );
};

export default PageAnimation;

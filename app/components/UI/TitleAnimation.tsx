// "use client";

// import React, { useEffect, useState } from "react";

// interface PageAnimationProps {
//   title: string;
//   intervalMs: number;
// }

// const PageAnimation: React.FC<PageAnimationProps> = ({ title, intervalMs }) => {
//   const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(-1);
//   const [displayedLetter, setDisplayedLetter] = useState<string>("");
//   const textColorClass = title === "MAUD" ? "text-white" : "text-black";

//   useEffect(() => {
//     const timeouts: number[] = [];
//     for (let i = 0; i <= title.length; i++) {
//       const timeout = setTimeout(() => {
//         setCurrentLetterIndex(i);
//       }, i * intervalMs) as unknown as number;
//       timeouts.push(timeout);
//     }

//     return () => {
//       timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
//     };
//   }, [title, intervalMs]);

//   useEffect(() => {
//     if (currentLetterIndex >= 0 && currentLetterIndex < title.length) {
//       setDisplayedLetter(title.charAt(currentLetterIndex));
//     } else {
//       setDisplayedLetter("");
//     }
//   }, [currentLetterIndex, title]);

//   return (
//     <div className="w-full h-dvh md:h-screen absolute top-0 left-0 flex items-center justify-center pointer-events-none z-40">
//       <h1 className={`text-5xl md:text-6xl ${textColorClass}`}>
//         {displayedLetter}
//       </h1>
//     </div>
//   );
// };

// export default PageAnimation;

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
    // Clear previous timeouts if any
    const timeouts: number[] = [];

    // Function to initiate or repeat the animation
    const initiateAnimation = () => {
      for (let i = 0; i <= title.length; i++) {
        const timeout = setTimeout(() => {
          setCurrentLetterIndex(i);
          // For "MAUD", restart the animation by recalling this function
          if (title === "MAUD" && i === title.length) {
            setCurrentLetterIndex(-1); // Reset index to -1 to restart
            initiateAnimation(); // Restart the animation
          }
        }, i * intervalMs) as unknown as number;
        timeouts.push(timeout);
      }
    };

    initiateAnimation(); // Start the animation

    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [title, intervalMs]);

  useEffect(() => {
    if (currentLetterIndex >= 0 && currentLetterIndex < title.length) {
      setDisplayedLetter(title.charAt(currentLetterIndex));
    } else if (title !== "MAUD") {
      // Prevent clearing the letter for "MAUD" on loop restart
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

// ScrollDown.tsx
"use client";

import { useEffect } from "react";

const ScrollDown = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight, // Scrolls down one viewport height
        behavior: "smooth", // Mimics the smooth scroll of a mouse
      });
    }, 3000); // Executes after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timeout
  }, []);

  return null; // This component does not render anything
};

export default ScrollDown;

"use client";

import { useEffect } from "react";

const ScrollDown = () => {
  useEffect(() => {
    // Function to check if the current device is mobile
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };

    // Only set the timeout for scrolling if not on a mobile device
    if (!isMobile()) {
      const timer = setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight, // Scrolls down one viewport height
          behavior: "smooth", // Mimics the smooth scroll of a mouse
        });
      }, 3000); // Executes after 3 seconds

      // Cleanup the timeout on component unmount
      return () => clearTimeout(timer);
    }
  }, []);

  return null; // This component does not render anything
};

export default ScrollDown;

"use client";

import { useEffect } from "react";

const ScrollDown = () => {
  useEffect(() => {
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };

    if (!isMobile()) {
      let userScrolled = false;

      const handleUserScroll = () => {
        userScrolled = true;
        window.removeEventListener("scroll", handleUserScroll);
      };

      window.addEventListener("scroll", handleUserScroll, { passive: true });

      const timer = setTimeout(() => {
        if (!userScrolled) {
          window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }
      }, 3000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleUserScroll);
      };
    }
  }, []);

  return null;
};

export default ScrollDown;

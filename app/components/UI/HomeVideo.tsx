"use client";

import Video from "./Video";
import { useState, useEffect } from "react";

interface HomeItem {
  videoUrl: string;
  subtitle: string;
}

interface HomeProps {
  content: HomeItem[];
}

export default function HomeVideo({ content }: HomeProps) {
  const videoUrl = content[0].videoUrl;

  const [hideVideo, setHideVideo] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold =
        document.documentElement.scrollHeight - window.innerHeight;
      setHideVideo(scrollPosition > threshold);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`h-dvh md:h-screen w-full fixed z-0 bg-black pointer-events-none ${
        hideVideo ? "hidden" : "block"
      }`}
    >
      <Video videoUrl={videoUrl} poster={""} />
    </div>
  );
}

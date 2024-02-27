"use client";

import Video from "./Video";
import { useState, useEffect } from "react";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({ projectId, dataset });

interface HomeItem {
  videoUrl: string;
  subtitle: string;
  videoPosterUrl: string;
}

interface HomeProps {
  content: HomeItem[];
}

export default function HomeVideo({ content }: HomeProps) {
  const [hideVideo, setHideVideo] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold =
        document.documentElement.scrollHeight - window.innerHeight - 500;
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
      {content &&
        content.map((data, index) => (
          <Video
            key={index}
            videoUrl={data.videoUrl}
            poster={
              data.videoPosterUrl
                ? builder.image(data.videoPosterUrl).quality(50).url()
                : ""
            }
          />
        ))}
    </div>
  );
}

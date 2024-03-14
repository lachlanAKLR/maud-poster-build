"use client";

import Video from "./Video";
import { useState, useEffect } from "react";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

const builder = imageUrlBuilder({ projectId, dataset });

interface HomeItem {
  videoUrl: string;
  subtitle: string;
  videoPosterUrl: string;
}

interface HomeProps {
  content: SanityDocument[];
}

export default function HomeVideo({ content }: HomeProps) {
  const [showVideo, setShowVideo] = useState<boolean>(true);

  useEffect(() => {
    const onScroll = () => {
      const hasScrolledOneViewport = window.scrollY > window.innerHeight + 100;
      setShowVideo(!hasScrolledOneViewport);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!showVideo) {
    return null;
  }

  return (
    <div className="h-dvh md:h-screen w-full fixed z-0 bg-black pointer-events-none">
      {content.map((data, index) => (
        <Video
          key={`home-video-${index}`}
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

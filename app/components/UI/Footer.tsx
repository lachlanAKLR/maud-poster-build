"use client";

import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { ProfileType } from "@/types";
import { useState, useEffect } from "react";

const builder = imageUrlBuilder({ projectId, dataset });

interface FooterProps {
  settings: ProfileType[];
}

export default function Footer({ settings }: FooterProps) {
  const data = settings[0];

  const [showFooter, setShowFooter] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold =
        document.documentElement.scrollHeight - window.innerHeight;
      setShowFooter(scrollPosition > threshold);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className={` text-center bg-maud-grey min-h-dvh md:min-h-screen flex flex-col justify-between fixed bottom-0 z-[-2] ${
        showFooter ? "block" : "hidden"
      }`}
    >
      <div className="text-sm">
        <h3 className="py-32">
          Got a project in mind?
          <br />
          Email us at
          <a href={`mailto:${data.email}`}> {data.email}</a>
        </h3>
      </div>
      {data.image ? (
        <Image
          className="w-full h-1/2 object-cover"
          src={builder.image(data.image.image).quality(100).url()}
          width={3000}
          height={3000}
          quality={100}
          alt={data.image.alt || ""}
          priority
          placeholder="empty"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 100vw, 100vw"
        />
      ) : null}
    </footer>
  );
}

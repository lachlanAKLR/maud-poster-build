"use client";

import Image from "next/image";
import { SingleProjectProps } from "@/types";
import { useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import Video from "./Video";
import { useRouter } from "next/navigation";

const builder = imageUrlBuilder({ projectId, dataset });

const SingleProjectThumb: React.FC<SingleProjectProps> = ({
  project,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setTimeout(() => {
      router.push(`/work/${project.slug.current}`);
    }, 350);
  };
  return (
    <div
      className="col-span-2 flex flex-col justify-center content-center cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {project.thumbnailImage && project.thumbnailImage.videoUrl ? (
        <div
          className={`object-cover bg-maud-grey ${
            project.thumbnailImage.ratio === "square"
              ? "aspect-[1/1]"
              : project.thumbnailImage.ratio === "landscape"
              ? "aspect-[4/3]"
              : "aspect-[3/4]"
          }`}
        >
          <Video
            videoUrl={project.thumbnailImage.videoUrl}
            poster={
              project.thumbnailImage
                ? builder.image(project.thumbnailImage).quality(50).url()
                : ""
            }
          />
        </div>
      ) : project.thumbnailImage ? (
        <Image
          className={`object-cover bg-maud-grey ${
            project.thumbnailImage.ratio === "square"
              ? "aspect-[1/1]"
              : project.thumbnailImage.ratio === "landscape"
              ? "aspect-[4/3]"
              : "aspect-[3/4]"
          }`}
          src={builder.image(project.thumbnailImage).quality(100).url()}
          width={3000}
          height={3000}
          quality={100}
          alt={project.thumbnailImage.alt || ""}
          priority={index >= 0 && index <= 2}
          blurDataURL="data:..."
          placeholder="blur"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 33vw, 33vw"
        />
      ) : null}
      <div
        className={`hidden md:block transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        } text-xs pt-2`}
      >
        <p>
          <span className="uppercase mr-1">{project.title},</span>
          {project.subtitle}
        </p>
      </div>
    </div>
  );
};

export default SingleProjectThumb;

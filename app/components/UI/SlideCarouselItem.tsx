import React from "react";
import { CarouselItemProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import Video from "./Video";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

const SlideCarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  const hasVideo = !!item.featuredImage.videoUrl;
  return (
    <Link className="" href={`/work/${item.slug.current}`}>
      {hasVideo ? (
        //@ts-ignore
        <Video videoUrl={item.featuredImage.videoUrl} />
      ) : (
        <Image
          layout="fill"
          objectFit="cover"
          src={builder.image(item.featuredImage).quality(100).url()}
          alt={item.featuredImage.alt || ""}
          priority
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 100vw, 100vw"
          className="bg-maud-grey"
        />
      )}
      <div className="absolute left-0 px-1 bottom-1 z-50 text-white text-xs flex justify-between w-full">
        <p>
          <span className="uppercase mr-2">{item.title}</span>
          {item.subtitle}
        </p>
        <p className="align-right"></p>
      </div>
    </Link>
  );
};

export default SlideCarouselItem;

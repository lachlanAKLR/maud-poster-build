import Video from "./Video";
import { CarouselItemProps } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const builder = imageUrlBuilder({ projectId, dataset });

function formatNumber(num: number): string {
  num += 1;

  return num.toString().padStart(2, "0");
}

//@ts-ignore
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  isVisible,
  index,
  indexLength,
  onFadeOut,
}) => {
  const hasVideo = !!item.featuredImage.videoUrl;
  const hasFeaturedPortrait = !!item.featuredImage.featuredPortrait;
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const router = useRouter();

  const handleClick = () => {
    if (onFadeOut) {
      onFadeOut();
    }

    setTimeout(() => {
      router.push(`/work/${item.slug.current}`);
    }, 250);
  };

  return (
    <motion.div
      className={`absolute inset-0 ${isVisible ? "" : "pointer-events-none"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cursor-none" onClick={handleClick}>
        {hasVideo ? (
          <div className="h-screen">
            {/* @ts-ignore */}
            <Video videoUrl={item.featuredImage.videoUrl} />
          </div>
        ) : hasFeaturedPortrait && isSmallScreen ? (
          <Image
            layout="fill"
            objectFit="cover"
            src={builder
              // @ts-ignore
              .image(item.featuredImage.featuredPortrait)
              .quality(100)
              .url()}
            alt={item.featuredImage.alt || ""}
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 100vw, 100vw"
            className="bg-maud-grey"
          />
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
          <p className="w-3/4 md:w-fit">
            <span className="uppercase mr-1">{item.title}</span>
            {item.subtitle}
          </p>
          <p className="align-right">
            {formatNumber(index)}/{formatNumber(indexLength)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselItem;

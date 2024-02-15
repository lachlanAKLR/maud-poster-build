"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { getCarouselItems } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { dataset, projectId } from "@/sanity/env";
import Video from "./Video";
import Link from "next/link";
import { CarouselItemProps } from "@/types";

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
}) => {
  const hasVideo = !!item.featuredImage.videoUrl;
  const hasFeaturedPortrait = !!item.featuredImage.featuredPortrait;
  const isSmallScreen = useMediaQuery("(max-width:639px)");

  console.log(
    `${item.title} has Featured Portrait? ${hasFeaturedPortrait} and we're on a small Screen? ${isSmallScreen}`
  );

  return (
    <motion.div
      className={`absolute inset-0 ${isVisible ? "" : "pointer-events-none"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link className="cursor-none" href={`/work/${item.slug.current}`}>
        {hasVideo ? (
          // @ts-ignore
          <Video videoUrl={item.featuredImage.videoUrl} />
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
      </Link>
    </motion.div>
  );
};

const Carousel: React.FC = () => {
  const [content, setContent] = useState<ProfileType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const changeTime = 5000;

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedContent = await getCarouselItems();
      setContent(fetchedContent);
      setIsContentLoaded(true);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === content[0]?.carousel.length - 1 ? 0 : prevIndex + 1
      );
      setResetKey((prevKey) => prevKey + 1);
    }, changeTime);

    return () => clearInterval(timer);
  }, [content, currentIndex, isContentLoaded]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content[0].carousel.length - 1 ? 0 : prevIndex + 1
    );
    setResetKey((prevKey) => prevKey + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content[0].carousel.length - 1 : prevIndex - 1
    );
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="relative h-screen w-full">
      {content.length > 0 &&
        content[0].carousel.map((item, index) => (
          <CarouselItem
            key={item._id}
            //@ts-ignore
            item={item}
            isVisible={index === currentIndex}
            index={index}
            indexLength={content[0].carousel.length - 1}
          />
        ))}
      <button
        className="absolute cursor-none w-1/3 h-full bottom-[40px] left-0 z-30"
        onClick={handlePrev}
      ></button>
      <button
        className="absolute cursor-none w-1/3 h-full bottom-[40px] right-0 z-30"
        onClick={handleNext}
      ></button>
    </div>
  );
};

export default Carousel;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { getCarouselItems } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { dataset, projectId } from "@/sanity/env";
import Video from "./Video";
import CountdownCircle from "./CountdownCircle";
import Link from "next/link";

const builder = imageUrlBuilder({ projectId, dataset });

interface CarouselItemProps {
  item: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    subtitle?: string;
    featuredImage: {
      asset: {
        _ref: string;
      };
      alt?: string;
      videoUrl?: string;
    };
  };
  isVisible: boolean;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item, isVisible }) => {
  const hasVideo = !!item.featuredImage.videoUrl;

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        />
      )}
      <div className="absolute left-1 bottom-1 z-50 text-white text-xs flex">
        <p>
          <span className="uppercase mr-2">{item.title}</span>
          {item.subtitle}
        </p>
        <Link className="ml-2" href={`/work/${item.slug.current}`}>
          View project
        </Link>
      </div>
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
          />
        ))}
      <CountdownCircle
        key={currentIndex}
        duration={changeTime}
        startCountdown={isContentLoaded}
      />
      <button
        className="absolute cursor-none w-1/2 h-full  bottom-[40px] left-0 z-30"
        onClick={handlePrev}
      ></button>
      <button
        className="absolute cursor-none w-1/2 h-full bottom-[40px] right-0 z-30"
        onClick={handleNext}
      ></button>
    </div>
  );
};

export default Carousel;

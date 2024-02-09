"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { getCarouselItems } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

interface CarouselItemProps {
  item: {
    _id: string;
    title: string;
    subtitle?: string;
    featuredImage: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
  };
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <div className="relative h-screen w-full">
      <Image
        layout="fill"
        objectFit="cover"
        src={builder.image(item.featuredImage).quality(100).url()}
        alt={item.featuredImage.alt || ""}
        priority
      />
      <div className="absolute left-1 bottom-1 z-10 text-white">
        <p>
          <span className="uppercase mr-2">{item.title}</span>
          {item.subtitle}
        </p>
      </div>
    </div>
  );
};

const Carousel: React.FC = () => {
  const [content, setContent] = useState<ProfileType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedContent = await getCarouselItems();
      setContent(fetchedContent);
    };

    fetchItems();
  }, []);

  // Handlers for next and previous buttons
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content[0].carousel.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content[0].carousel.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <motion.div
        className="overflow-hidden relative"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        {content.length > 0 && content[0].carousel[currentIndex] ? (
          // @ts-ignore
          <CarouselItem item={content[0].carousel[currentIndex]} />
        ) : null}
      </motion.div>
      <button className="absolute top-1/2 left-0 z-30" onClick={handlePrev}>
        Prev
      </button>
      <button className="absolute top-1/2 right-0 z-30" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;

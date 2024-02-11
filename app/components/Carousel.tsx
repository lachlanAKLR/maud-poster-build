// Remain the imports as they were
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { getCarouselItems } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

interface CountdownCircleProps {
  duration: number; // Specify that duration is of type number
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({ duration }) => {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      width="24" // Adjusted SVG container width to fit the smaller circle
      height="24" // Adjusted SVG container height to fit the smaller circle
      className="absolute bottom-2 right-2"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        stroke="rgba(255, 255, 255, 0.5)" // Semi-transparent white
        strokeWidth="3"
        fill="transparent"
        r={radius}
        cx="12"
        cy="12"
      />
      <circle
        stroke="white"
        strokeWidth="3" // Maintain or adjust stroke width if necessary
        fill="transparent"
        r={radius}
        cx="12" // Center x-coordinate adjusted for the new SVG size
        cy="12" // Center y-coordinate adjusted for the new SVG size
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
          animation: `countdown ${duration / 1000}s linear infinite forwards`,
        }}
      />
      <style jsx>{`
        @keyframes countdown {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
};

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
  isVisible: boolean;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item, isVisible }) => {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        layout="fill"
        objectFit="cover"
        src={builder.image(item.featuredImage).quality(100).url()}
        alt={item.featuredImage.alt || ""}
        priority
      />
      <div className="absolute left-1 bottom-1 z-10 text-white text-xs">
        <p>
          <span className="uppercase mr-2">{item.title}</span>
          {item.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

const Carousel: React.FC = () => {
  const [content, setContent] = useState<ProfileType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0); // Key to force re-render the countdown circle
  const changeTime = 5000;

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedContent = await getCarouselItems();
      setContent(fetchedContent);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === content[0]?.carousel.length - 1 ? 0 : prevIndex + 1
      );
      setResetKey((prevKey) => prevKey + 1); // Increment key to reset countdown animation
    }, changeTime); // Adjust duration to match the countdown circle

    return () => clearInterval(timer);
  }, [content, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content[0].carousel.length - 1 ? 0 : prevIndex + 1
    );
    setResetKey((prevKey) => prevKey + 1); // Reset countdown animation on manual change
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content[0].carousel.length - 1 : prevIndex - 1
    );
    setResetKey((prevKey) => prevKey + 1); // Reset countdown animation on manual change
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
      <CountdownCircle key={resetKey} duration={changeTime} />{" "}
      {/* Match the interval duration */}
      <button
        className="absolute cursor-none w-1/2 h-full top-0 left-0 z-30"
        onClick={handlePrev}
      ></button>
      <button
        className="absolute cursor-none w-1/2 h-full top-0 right-0 z-30"
        onClick={handleNext}
      ></button>
    </div>
  );
};

export default Carousel;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCarouselItems } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import CarouselItem from "./CarouselItem";

const Carousel: React.FC = () => {
  const [content, setContent] = useState<ProfileType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedContent = await getCarouselItems();
      setContent(fetchedContent);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!isFadingOut) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === content[0]?.carousel.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [content, currentIndex, isFadingOut]);

  const triggerFadeOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {}, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="relative h-dvh md:h-screen w-full bg-maud-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content.length > 0 &&
          content[0].carousel.map((item, index) => (
            <CarouselItem
              key={item._id}
              // @ts-ignore
              item={item}
              isVisible={index === currentIndex}
              index={index}
              indexLength={content[0].carousel.length - 1}
              onFadeOut={triggerFadeOut}
            />
          ))}
        <button
          className="absolute cursor-none w-1/3 h-full bottom-[40px] left-0 z-30"
          onClick={() =>
            setCurrentIndex(
              (currentIndex - 1 + content[0].carousel.length) %
                content[0].carousel.length
            )
          }
        ></button>
        <button
          className="absolute cursor-none w-1/3 h-full bottom-[40px] right-0 z-30"
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % content[0].carousel.length)
          }
        ></button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Carousel;

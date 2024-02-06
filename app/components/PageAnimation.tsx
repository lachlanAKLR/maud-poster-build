"use client";

import { motion } from "framer-motion";

const typeVariants = (index: number) => ({
  [`blink${index}`]: {
    opacity: [0, 0, 1, 1, 0, 0],
    transition: {
      duration: 0.35,
      delay: index * 0.35,
      ease: "easeOut",
      times: [0, 0.5, 0.5, 1],
    },
  },
});

interface PageAnimationProps {
  title: string;
}

export default function PageAnimation({ title }: PageAnimationProps) {
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center pointer-events-none">
      <div className="flex justify-center content-center relative h-[50rem] w-96">
        {title.split("").map((item, index) => (
          <h1
            key={index}
            id={index.toString()}
            className="absolute top-0 text-center"
          >
            <motion.span
              variants={typeVariants(index)}
              animate={`blink${index}`}
            >
              {item}
            </motion.span>
          </h1>
        ))}
      </div>
    </div>
  );
}

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
    <div className="w-full h-screen absolute top-0 pointer-events-none flex items-center justify-center">
      {title.split("").map((item, index) => (
        <h1
          key={index}
          id={index.toString()}
          className="absolute top-0 size-full text-center"
        >
          <motion.span variants={typeVariants(index)} animate={`blink${index}`}>
            {item}
          </motion.span>
        </h1>
      ))}
    </div>
  );
}

"use client";

// import React, { useState, FC } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { wrap } from "popmotion";
// import { ReactElement } from "react";

// type SlideCarouselProps = {
//   children: ReactElement[];
// };

// const SlideCarousel: FC<SlideCarouselProps> = ({ children }) => {
//   const [[page, direction], setPage] = useState([0, 0]);
//   const index = wrap(0, children.length, page);

//   const paginate = (newDirection: number) => {
//     setPage([page + newDirection, newDirection]);
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset: number, velocity: number) => {
//     return Math.abs(offset) * velocity;
//   };

//   return (
//     <div className="overflow-hidden h-screen w-full relative">
//       <AnimatePresence initial={false} custom={direction}>
//         <motion.div
//           key={page}
//           custom={direction}
//           variants={{
//             enter: (direction: number) => ({
//               x: direction > 0 ? 1000 : -1000,
//               opacity: 0,
//             }),
//             center: {
//               zIndex: 1,
//               x: 0,
//               opacity: 1,
//             },
//             exit: (direction: number) => ({
//               zIndex: 0,
//               x: direction < 0 ? 1000 : -1000,
//               opacity: 0,
//             }),
//           }}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           transition={{
//             x: { type: "spring", stiffness: 300, damping: 30 },
//             opacity: { duration: 0.2 },
//           }}
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           dragElastic={1}
//           onDragEnd={(e, { offset, velocity }) => {
//             const swipe = swipePower(offset.x, velocity.x);

//             if (swipe < -swipeConfidenceThreshold) {
//               paginate(1);
//             } else if (swipe > swipeConfidenceThreshold) {
//               paginate(-1);
//             }
//           }}
//           className="absolute w-full h-full"
//         >
//           {children[index]}
//         </motion.div>
//       </AnimatePresence>
//       <div className="absolute bottom-5 left-0 right-0 flex justify-between items-center px-5 z-40">
//         <button
//           type="button"
//           onClick={() => paginate(-1)}
//           className="text-white"
//         >
//           Previous
//         </button>
//         <button
//           type="button"
//           onClick={() => paginate(1)}
//           className="text-white"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SlideCarousel;

// Assuming you're using TypeScript and React

import React, { useState, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactElement } from "react";

type SlideCarouselProps = {
  children: ReactElement[];
};

const SlideCarousel: FC<SlideCarouselProps> = ({ children }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const childrenCount = React.Children.count(children);
  const index = (idx: number) => (page + idx + childrenCount) % childrenCount;

  const paginate = (newDirection: number) => {
    setPage((prev) => [
      (prev[0] + newDirection + childrenCount) % childrenCount,
      newDirection,
    ]);
  };

  return (
    <div className="overflow-hidden h-screen w-full relative flex justify-center items-center">
      <AnimatePresence initial={false}>
        {[-1, 0, 1].map((pos) => (
          <motion.div
            key={index(pos)}
            custom={direction}
            initial={{ x: pos * 100 + "%" }}
            animate={{ x: pos * 20 + "%" }} // Adjusted for the peek effect
            exit={{ x: (pos - direction) * 100 + "%" }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={`absolute w-4/5 h-full flex items-center justify-center`}
            style={{
              zIndex: pos === 0 ? 1 : 0,
            }}
          >
            {children[index(pos)]}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute bottom-5 left-0 right-0 flex justify-between items-center px-5 z-40">
        <button
          type="button"
          onClick={() => paginate(-1)}
          className="text-white"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          className="text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SlideCarousel;

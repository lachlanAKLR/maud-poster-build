// "use client";

// import React, { useState, useEffect } from "react";
// import ArchiveThumb from "./ArchiveThumb";
// import { SanityDocument } from "next-sanity";
// import useMediaQuery from "../Utilities/useMediaQuery";
// import { shuffleArray } from "../Utilities/shuffleArray";

// interface ClickGalleryProps {
//   documents: SanityDocument[];
// }

// interface DisplayedDocument {
//   doc: SanityDocument;
//   position: { x: number; y: number };
//   width: number;
// }

// const ClickGallery: React.FC<ClickGalleryProps> = ({ documents }) => {
//   const isSmallScreen = useMediaQuery("(max-width:768px)");
//   const [shuffledDocuments, setShuffledDocuments] = useState<SanityDocument[]>(
//     []
//   );
//   const [displayedDocuments, setDisplayedDocuments] = useState<
//     DisplayedDocument[]
//   >([]);
//   const [currentPosition, setCurrentPosition] = useState<{
//     x: number;
//     y: number;
//   } | null>(null);
//   const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     setShuffledDocuments(shuffleArray([...documents]));
//   }, [documents]);

//   const startHold = (x: number, y: number) => {
//     const nextDocumentIndex =
//       displayedDocuments.length % shuffledDocuments.length;
//     const nextDocument = shuffledDocuments[nextDocumentIndex];
//     const initialWidth = isSmallScreen ? 100 : 250;
//     const initialPosition = {
//       x: x - initialWidth / 2,
//       y: y - initialWidth / 2,
//     };
//     const newDisplayDocument: DisplayedDocument = {
//       doc: nextDocument,
//       position: initialPosition,
//       width: initialWidth,
//     };

//     setCurrentPosition(initialPosition);
//     setDisplayedDocuments([...displayedDocuments, newDisplayDocument]);

//     const timer = setInterval(() => {
//       setDisplayedDocuments((currentDocs) =>
//         currentDocs.map((doc, index) => {
//           if (index === currentDocs.length - 1) {
//             const widthIncrease = 2;

//             return {
//               ...doc,
//               width: doc.width + widthIncrease,
//               position: {
//                 x: doc.position.x - widthIncrease / 2,
//                 y: doc.position.y - widthIncrease / 2,
//               },
//             };
//           }
//           return doc;
//         })
//       );
//     }, 0.25);

//     setHoldTimer(timer);
//   };

//   const endHold = () => {
//     if (holdTimer) {
//       clearInterval(holdTimer);
//       setHoldTimer(null);
//     }
//     setDisplayedDocuments((currentDocs) =>
//       currentDocs.map((doc, index) => {
//         if (index === currentDocs.length - 1) {
//           return { ...doc };
//         }
//         return doc;
//       })
//     );
//     setCurrentPosition(null);
//   };

//   // @ts-ignore
//   const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
//     startHold(event.clientX, event.clientY);
//   };

//   const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
//     const touch = event.touches[0];
//     startHold(touch.clientX, touch.clientY);
//   };

//   const resetLayout = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation(); // Prevents event from reaching the onMouseDown handler of the parent
//     setDisplayedDocuments([]);
//     setShuffledDocuments(shuffleArray([...documents])); // Reshuffle on reset
//   };

//   const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//       <div
//         className="w-full h-dvh md:h-screen relative select-none"
//         onMouseDown={handleMouseDown}
//         onMouseUp={endHold}
//         onMouseLeave={endHold}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={endHold}
//         onContextMenu={handleContextMenu}
//         style={{ cursor: "pointer" }}
//       >
//         {displayedDocuments.map(({ doc, position, width }, index) => (
//           <div
//             key={index}
//             style={{
//               position: "absolute",
//               left: position.x,
//               top: position.y,
//             }}
//           >
//             {/* @ts-ignore */}
//             <ArchiveThumb data={doc} index={index} dynamicWidth={width} />
//           </div>
//         ))}
//       </div>
//       <button
//         className="text-xs absolute bottom-0 right-0 text-white p-2 m-1 h-fit w-fit z-20"
//         onClick={resetLayout}
//       >
//         Clear
//       </button>
//     </>
//   );
// };

// export default ClickGallery;

"use client";

import React, { useState, useEffect } from "react";
import ArchiveThumb from "./ArchiveThumb";
import { SanityDocument } from "next-sanity";
import useMediaQuery from "../Utilities/useMediaQuery";
import { shuffleArray } from "../Utilities/shuffleArray";

interface ClickGalleryProps {
  documents: SanityDocument[];
}

interface DisplayedDocument {
  doc: SanityDocument;
  position: { x: number; y: number };
  width: number;
}

const ClickGallery: React.FC<ClickGalleryProps> = ({ documents }) => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const [shuffledDocuments, setShuffledDocuments] = useState<SanityDocument[]>(
    []
  );
  const [displayedDocuments, setDisplayedDocuments] = useState<
    DisplayedDocument[]
  >([]);
  const [currentPosition, setCurrentPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setShuffledDocuments(shuffleArray([...documents]));
    // Prefetch the first and the second document upon initial load or documents update
    prefetchDocuments();
  }, [documents]);

  // Prefetching function
  const prefetchDocuments = () => {
    if (documents.length > 1) {
      // Preload first two documents if available
      const prefetchIndexes = [0, 1, 2, 4];
      prefetchIndexes.forEach((index) => {
        const doc = documents[index];
        if (doc) {
          // This preloads the image by creating a new Image object and setting its source to the document's image URL.
          // Assuming 'imageUrl' exists on your SanityDocument object (you might need to adjust this)
          const img = new Image();
          img.src = doc.imageUrl; // Adjust 'imageUrl' according to your data structure
        }
      });
    } else if (documents.length === 1) {
      // Preload only the first document if that's all there is
      const img = new Image();
      img.src = documents[0].imageUrl; // Adjust 'imageUrl' according to your data structure
    }
  };

  const startHold = (x: number, y: number) => {
    const nextDocumentIndex =
      displayedDocuments.length % shuffledDocuments.length;
    const nextDocument = shuffledDocuments[nextDocumentIndex];
    const initialWidth = isSmallScreen ? 100 : 250;
    const initialPosition = {
      x: x - initialWidth / 2,
      y: y - initialWidth / 2,
    };
    const newDisplayDocument: DisplayedDocument = {
      doc: nextDocument,
      position: initialPosition,
      width: initialWidth,
    };

    setCurrentPosition(initialPosition);
    setDisplayedDocuments([...displayedDocuments, newDisplayDocument]);

    const timer = setInterval(() => {
      setDisplayedDocuments((currentDocs) =>
        currentDocs.map((doc, index) => {
          if (index === currentDocs.length - 1) {
            const widthIncrease = 2;

            return {
              ...doc,
              width: doc.width + widthIncrease,
              position: {
                x: doc.position.x - widthIncrease / 2,
                y: doc.position.y - widthIncrease / 2,
              },
            };
          }
          return doc;
        })
      );
    }, 0.25);

    setHoldTimer(timer);
  };

  const endHold = () => {
    if (holdTimer) {
      clearInterval(holdTimer);
      setHoldTimer(null);
    }
    setDisplayedDocuments((currentDocs) =>
      currentDocs.map((doc, index) => {
        if (index === currentDocs.length - 1) {
          return { ...doc };
        }
        return doc;
      })
    );
    setCurrentPosition(null);
  };

  // @ts-ignore
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    startHold(event.clientX, event.clientY);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    startHold(touch.clientX, touch.clientY);
  };

  const resetLayout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevents event from reaching the onMouseDown handler of the parent
    setDisplayedDocuments([]);
    setShuffledDocuments(shuffleArray([...documents])); // Reshuffle on reset
    // Prefetch documents again after resetting
    prefetchDocuments();
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        className="w-full h-dvh md:h-screen relative select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={handleTouchStart}
        onTouchEnd={endHold}
        onContextMenu={handleContextMenu}
        style={{ cursor: "pointer" }}
      >
        {displayedDocuments.map(({ doc, position, width }, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
            }}
          >
            {/* Assuming ArchiveThumb can accept and handle image preloading or has an efficient rendering mechanism */}
            <ArchiveThumb data={doc} index={index} dynamicWidth={width} />
          </div>
        ))}
      </div>
      <button
        className="text-xs absolute bottom-0 right-0 text-white p-2 m-1 h-fit w-fit z-20"
        onClick={resetLayout}
      >
        Clear
      </button>
    </>
  );
};

export default ClickGallery;

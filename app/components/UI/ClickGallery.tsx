// "use client";

// import React, { useState, useEffect } from "react";
// import ArchiveThumb from "./ArchiveThumb";
// import { ProfileType } from "@/types";

// interface ClickGalleryProps {
//   documents: ProfileType[];
// }

// interface DisplayedDocument {
//   doc: ProfileType;
//   position: { x: number; y: number };
//   width: number;
// }

// const ClickGallery: React.FC<ClickGalleryProps> = ({ documents }) => {
//   const [shuffledDocuments, setShuffledDocuments] = useState<ProfileType[]>([]);
//   const [startPosition, setStartPosition] = useState<{
//     x: number;
//     y: number;
//   } | null>(null);
//   const [displayedDocuments, setDisplayedDocuments] = useState<
//     DisplayedDocument[]
//   >([]);
//   const [draggingDocument, setDraggingDocument] =
//     useState<DisplayedDocument | null>(null);

//   const shuffleArray = (array: ProfileType[]) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   useEffect(() => {
//     setShuffledDocuments(shuffleArray([...documents]));
//   }, [documents]);

//   // @ts-ignore
//   const handleStart = (clientX, clientY) => {
//     const nextDocumentIndex =
//       displayedDocuments.length % shuffledDocuments.length;
//     const nextDocument = shuffledDocuments[nextDocumentIndex];
//     setStartPosition({ x: clientX, y: clientY });
//     setDraggingDocument({
//       doc: nextDocument,
//       position: { x: clientX, y: clientY },
//       width: 0,
//     });
//   };

//   // @ts-ignore
//   const handleMove = (clientX, clientY) => {
//     if (startPosition && draggingDocument) {
//       const width = clientX - startPosition.x;
//       setDraggingDocument({
//         ...draggingDocument,
//         width: Math.abs(width),
//       });
//     }
//   };

//   // @ts-ignore
//   const handleMouseDown = (event) => {
//     handleStart(event.clientX, event.clientY);
//   };

//   // @ts-ignore
//   const handleMouseMove = (event) => {
//     if (startPosition && draggingDocument) {
//       handleMove(event.clientX, event.clientY);
//     }
//   };

//   const handleMouseUp = () => {
//     if (draggingDocument) {
//       setDisplayedDocuments([...displayedDocuments, draggingDocument]);
//       setStartPosition(null);
//       setDraggingDocument(null);
//     }
//   };

//   // @ts-ignore
//   const handleTouchStart = (event) => {
//     const touch = event.touches[0];
//     handleStart(touch.clientX, touch.clientY);
//   };

//   // @ts-ignore
//   const handleTouchMove = (event) => {
//     const touch = event.touches[0];
//     handleMove(touch.clientX, touch.clientY);
//   };

//   const handleTouchEnd = () => {
//     handleMouseUp();
//   };

//   const resetLayout = () => {
//     setDisplayedDocuments([]);
//     setShuffledDocuments(shuffleArray([...documents]));
//   };

//   return (
//     <div
//       className="w-full h-screen relative select-none"
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       style={{ cursor: "nwse-resize" }}
//     >
//       {displayedDocuments.map(({ doc, position, width }, index) => (
//         <div
//           key={index}
//           style={{
//             position: "absolute",
//             left: position.x,
//             top: position.y,
//           }}
//         >
//           {/* @ts-ignore */}
//           <ArchiveThumb data={doc} index={index} dynamicWidth={width} />
//         </div>
//       ))}
//       {draggingDocument && (
//         <div
//           style={{
//             position: "absolute",
//             left: draggingDocument.position.x,
//             top: draggingDocument.position.y,
//           }}
//         >
//           <ArchiveThumb
//             // @ts-ignore
//             data={draggingDocument.doc}
//             index={-1}
//             dynamicWidth={draggingDocument.width}
//           />
//         </div>
//       )}
//       <button
//         className="text-xs absolute bottom-[10px] right-[10px] text-white"
//         onClick={resetLayout}
//       >
//         Reset Layout
//       </button>
//     </div>
//   );
// };

// export default ClickGallery;

"use client";

import React, { useState, useEffect } from "react";
import ArchiveThumb from "./ArchiveThumb";
import { ProfileType } from "@/types";

interface ClickGalleryProps {
  documents: ProfileType[];
}

interface DisplayedDocument {
  doc: ProfileType;
  position: { x: number; y: number };
  width: number;
}

const ClickGallery: React.FC<ClickGalleryProps> = ({ documents }) => {
  const [shuffledDocuments, setShuffledDocuments] = useState<ProfileType[]>([]);
  const [displayedDocuments, setDisplayedDocuments] = useState<
    DisplayedDocument[]
  >([]);
  const [currentPosition, setCurrentPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);

  const shuffleArray = (array: ProfileType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setShuffledDocuments(shuffleArray([...documents]));
  }, [documents]);

  const startHold = (x: number, y: number) => {
    const nextDocumentIndex =
      displayedDocuments.length % shuffledDocuments.length;
    const nextDocument = shuffledDocuments[nextDocumentIndex];
    const initialWidth = 0; // Initial width
    const initialPosition = {
      x: x - initialWidth / 2, // Adjust starting position to center
      y: y - initialWidth / 2,
    };
    const newDisplayDocument: DisplayedDocument = {
      doc: nextDocument,
      position: initialPosition,
      width: initialWidth,
    };

    setCurrentPosition(initialPosition);
    setDisplayedDocuments([...displayedDocuments, newDisplayDocument]);

    // Start a timer to increase the width of the document over time
    const timer = setInterval(() => {
      setDisplayedDocuments((currentDocs) =>
        currentDocs.map((doc, index) => {
          if (index === currentDocs.length - 1) {
            // Target the last (active) document
            const widthIncrease = 2; // Increment for demonstration
            // Assuming height is adjusted similarly, replace with actual logic if applicable
            // const heightIncrease = 10;
            return {
              ...doc,
              width: doc.width + widthIncrease,
              position: {
                x: doc.position.x - widthIncrease / 2, // Center horizontally
                y: doc.position.y - widthIncrease / 2, // Center vertically if height is adjusted
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
      clearInterval(holdTimer); // Stop the timer
      setHoldTimer(null);
    }
    setCurrentPosition(null); // Reset current position
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    startHold(event.clientX, event.clientY);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    startHold(touch.clientX, touch.clientY);
  };

  const resetLayout = () => {
    setDisplayedDocuments([]);
    setShuffledDocuments(shuffleArray([...documents])); // Reshuffle on reset
  };

  return (
    <div
      className="w-full h-screen relative select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={handleTouchStart}
      onTouchEnd={endHold}
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
          {/* @ts-ignore */}
          <ArchiveThumb data={doc} index={index} dynamicWidth={width} />
        </div>
      ))}
      <button
        className="text-xs absolute bottom-[10px] right-[10px] text-white"
        onClick={resetLayout}
      >
        Reset Layout
      </button>
    </div>
  );
};

export default ClickGallery;

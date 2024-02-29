"use client";

import React, { useState, useEffect } from "react";
import ArchiveThumb from "./ArchiveThumb";
import { ProfileType } from "@/types";
import { SanityDocument } from "next-sanity";

interface ClickGalleryProps {
  documents: SanityDocument[];
}

interface DisplayedDocument {
  doc: SanityDocument;
  position: { x: number; y: number };
  width: number;
}

// @ts-ignore
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

  const shuffleArray = (array: SanityDocument[]) => {
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
            {/* @ts-ignore */}
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

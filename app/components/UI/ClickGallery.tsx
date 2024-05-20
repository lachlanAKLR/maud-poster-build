"use client";

import React, { useState, useEffect } from "react";
import { SanityDocument } from "next-sanity";
import useMediaQuery from "../Utilities/useMediaQuery";
import { shuffleArray } from "../Utilities/shuffleArray";
import ArchiveThumbImg from "./ArchiveThumbImg";
import Timer from "../Utilities/timer";
import IPAddress from "../Utilities/IPAddress";

interface ClickGalleryProps {
  documents: SanityDocument[];
}

interface DisplayedDocument {
  doc: SanityDocument;
  position: { x: number; y: number };
  width: number;
  timestamp: number;
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
    preloadImages();
  }, [documents]);

  const preloadImages = () => {
    documents.forEach((document) => {
      if (document.archiveImage && document.archiveImage.image) {
        const img = new Image();
        img.src = document.archiveImage.image;
      }
    });
  };

  const startHold = (x: number, y: number) => {
    // @ts-ignore
    const containerRect = document
      .getElementById("content")
      .getBoundingClientRect();
    const nextDocumentIndex =
      displayedDocuments.length % shuffledDocuments.length;
    const nextDocument = shuffledDocuments[nextDocumentIndex];
    const initialWidth = isSmallScreen ? 100 : 250;
    const initialPosition = {
      x: (x - containerRect.left) / 0.75 - initialWidth / 2,
      y: (y - containerRect.top) / 0.75 - initialWidth / 2,
    };
    const newDisplayDocument: DisplayedDocument = {
      doc: nextDocument,
      position: initialPosition,
      width: initialWidth,
      timestamp: Date.now(),
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
    event.stopPropagation();
    setDisplayedDocuments([]);
    setShuffledDocuments(shuffleArray([...documents]));
    preloadImages();
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        className="w-full  h-full relative select-none cursor-pointer"
        onMouseDown={isSmallScreen ? undefined : handleMouseDown}
        onMouseUp={isSmallScreen ? undefined : endHold}
        onMouseLeave={endHold}
        onTouchStart={isSmallScreen ? handleTouchStart : undefined}
        onTouchEnd={isSmallScreen ? endHold : undefined}
        onContextMenu={handleContextMenu}
      >
        {displayedDocuments.map(({ doc, position, width }, index) => (
          <div
            key={`click-gallery-${index}`}
            className="absolute"
            style={{
              left: position.x,
              top: position.y,
              width: `${width}px`,
              height: `${width}px`,
              zIndex: 10,
            }}
          >
            <ArchiveThumbImg data={doc} index={index} dynamicWidth={width} />
          </div>
        ))}
      </div>

      <div className="text-white text-small absolute bottom-1 left-2 z-50 pl-1 pb-2 pr-4 flex justify-between w-full">
        <div className="flex gap-3">
          <Timer />
          <IPAddress />
        </div>
        <div>MAUD.COM.AU</div>
      </div>
    </>
  );
};

export default ClickGallery;

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
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [displayedDocuments, setDisplayedDocuments] = useState<
    DisplayedDocument[]
  >([]);
  const [draggingDocument, setDraggingDocument] =
    useState<DisplayedDocument | null>(null);

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

  // @ts-ignore
  const handleStart = (clientX, clientY) => {
    const nextDocumentIndex =
      displayedDocuments.length % shuffledDocuments.length;
    const nextDocument = shuffledDocuments[nextDocumentIndex];
    setStartPosition({ x: clientX, y: clientY });
    setDraggingDocument({
      doc: nextDocument,
      position: { x: clientX, y: clientY },
      width: 0,
    });
  };

  // @ts-ignore
  const handleMove = (clientX, clientY) => {
    if (startPosition && draggingDocument) {
      const width = clientX - startPosition.x;
      setDraggingDocument({
        ...draggingDocument,
        width: Math.abs(width),
      });
    }
  };

  // @ts-ignore
  const handleMouseDown = (event) => {
    handleStart(event.clientX, event.clientY);
  };

  // @ts-ignore
  const handleMouseMove = (event) => {
    if (startPosition && draggingDocument) {
      handleMove(event.clientX, event.clientY);
    }
  };

  const handleMouseUp = () => {
    if (draggingDocument) {
      setDisplayedDocuments([...displayedDocuments, draggingDocument]);
      setStartPosition(null);
      setDraggingDocument(null);
    }
  };

  // @ts-ignore
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  // @ts-ignore
  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const resetLayout = () => {
    setDisplayedDocuments([]);
    setShuffledDocuments(shuffleArray([...documents]));
  };

  return (
    <div
      className="w-full h-screen relative select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: "nwse-resize" }}
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
      {draggingDocument && (
        <div
          style={{
            position: "absolute",
            left: draggingDocument.position.x,
            top: draggingDocument.position.y,
          }}
        >
          <ArchiveThumb
            // @ts-ignore
            data={draggingDocument.doc}
            index={-1}
            dynamicWidth={draggingDocument.width}
          />
        </div>
      )}
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

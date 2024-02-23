"use client";

import React, { useState } from "react";
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
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [displayedDocuments, setDisplayedDocuments] = useState<
    DisplayedDocument[]
  >([]);
  const [draggingDocument, setDraggingDocument] =
    useState<DisplayedDocument | null>(null);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const nextDocumentIndex = displayedDocuments.length % documents.length;
    const nextDocument = documents[nextDocumentIndex];
    setStartPosition({ x: event.clientX, y: event.clientY });
    setDraggingDocument({
      doc: nextDocument,
      position: { x: event.clientX, y: event.clientY },
      width: 0, // Initial width is 0, will update on drag
    });
  };

  const handleMouseUp = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (draggingDocument) {
      setDisplayedDocuments([...displayedDocuments, draggingDocument]);
      setStartPosition(null);
      setDraggingDocument(null); // Clear the dragging document
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (startPosition && draggingDocument) {
      const width = event.clientX - startPosition.x;
      setDraggingDocument({
        ...draggingDocument,
        width: Math.abs(width), // Update width dynamically
      });
    }
  };

  return (
    <div
      className="w-full h-screen relative select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setStartPosition(null);
        setDraggingDocument(null);
      }} // Reset on mouse leave
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
      {/* Render dragging ArchiveThumb if dragging */}
      {draggingDocument && (
        <div
          style={{
            position: "absolute",
            left: draggingDocument.position.x,
            top: draggingDocument.position.y,
          }}
        >
          <ArchiveThumb
            //  @ts-ignore
            data={draggingDocument.doc}
            index={-1}
            dynamicWidth={draggingDocument.width}
          />
        </div>
      )}
    </div>
  );
};

export default ClickGallery;

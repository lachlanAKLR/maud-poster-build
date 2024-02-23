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

//   const handleMouseDown = (
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     const nextDocumentIndex =
//       displayedDocuments.length % shuffledDocuments.length;
//     const nextDocument = shuffledDocuments[nextDocumentIndex];
//     setStartPosition({ x: event.clientX, y: event.clientY });
//     setDraggingDocument({
//       doc: nextDocument,
//       position: { x: event.clientX, y: event.clientY },
//       width: 0,
//     });
//   };

//   const handleMouseUp = (
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     if (draggingDocument) {
//       setDisplayedDocuments([...displayedDocuments, draggingDocument]);
//       setStartPosition(null);
//       setDraggingDocument(null);
//     }
//   };

//   const handleMouseMove = (
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     if (startPosition && draggingDocument) {
//       const width = event.clientX - startPosition.x;
//       setDraggingDocument({
//         ...draggingDocument,
//         width: Math.abs(width),
//       });
//     }
//   };

//   const resetLayout = () => {
//     setDisplayedDocuments([]);
//   };

//   return (
//     <div
//       className="w-full h-screen relative select-none"
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={() => {
//         setStartPosition(null);
//         setDraggingDocument(null);
//       }}
//       style={{ cursor: "move" }}
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
//             //  @ts-ignore
//             data={draggingDocument.doc}
//             index={-1}
//             dynamicWidth={draggingDocument.width}
//           />
//         </div>
//       )}
//       <button
//         className="text-xs absolute bottom-[10px] right-[10px]  text-white "
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

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const nextDocumentIndex =
      displayedDocuments.length % shuffledDocuments.length;
    const nextDocument = shuffledDocuments[nextDocumentIndex];
    setStartPosition({ x: event.clientX, y: event.clientY });
    setDraggingDocument({
      doc: nextDocument,
      position: { x: event.clientX, y: event.clientY },
      width: 0,
    });
  };

  const handleMouseUp = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (draggingDocument) {
      setDisplayedDocuments([...displayedDocuments, draggingDocument]);
      setStartPosition(null);
      setDraggingDocument(null);
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (startPosition && draggingDocument) {
      const width = event.clientX - startPosition.x;
      setDraggingDocument({
        ...draggingDocument,
        width: Math.abs(width),
      });
    }
  };

  const resetLayout = () => {
    setDisplayedDocuments([]);
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
      }}
      style={{ cursor: "move" }}
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
            //  @ts-ignore
            data={draggingDocument.doc}
            index={-1}
            dynamicWidth={draggingDocument.width}
          />
        </div>
      )}
      <button
        className="text-xs absolute bottom-[10px] right-[10px]  text-white "
        onClick={resetLayout}
      >
        Reset Layout
      </button>
    </div>
  );
};

export default ClickGallery;

"use client";

import ClickGallery from "./ClickGallery";
import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Define the type for the props
interface ScreenCaptureProps {
  documents: any[]; // Update this with the correct type for your documents
}

export default function ScreenCapture({ documents }: ScreenCaptureProps) {
  // Define the type for the ref
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Adjust this delay as needed
    return () => clearTimeout(timeout);
  }, [documents]);

  const handleGeneratePdf = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, {
        scale: 4, // Adjust the scale for higher resolution
        useCORS: true, // Use this if there are cross-origin images
      })
        .then((canvas) => {
          // Create an image from the canvas for debugging
          const imgData = canvas.toDataURL("image/png");

          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210; // A4 width in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Add the image to the PDF
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

          // Generate a timestamp
          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          pdf.save(`maud-poster-${timestamp}.pdf`);
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } else {
      console.error("Content reference is null");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div
          ref={contentRef}
          id="content"
          className="relative w-[210mm] h-[297mm] overflow-hidden bg-black border border-black transform scale-75"
        >
          {isLoaded && <ClickGallery documents={documents} />}
        </div>
      </div>
      <button
        className="text-black text-xs border border-black bg-white p-1 fixed z-20 left-3 top-3"
        onClick={handleGeneratePdf}
      >
        Generate PDF
      </button>
    </>
  );
}

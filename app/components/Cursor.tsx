"use client";

import React, { useState, useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const [cursorLabel, setCursorLabel] = useState<string>("next");
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null); // Ref to track the cursor element

  useEffect(() => {
    const updateCursor = (e: MouseEvent): void => {
      const { clientX: x, clientY: y } = e;
      const shouldShowPrevious = x < window.innerWidth / 2;
      setCursorLabel(shouldShowPrevious ? "previous" : "next");
      // Calculate offsets based on the cursor element's size
      const cursorWidth = cursorRef.current ? cursorRef.current.offsetWidth : 0;
      const cursorHeight = cursorRef.current
        ? cursorRef.current.offsetHeight
        : 0;
      setCursorPosition({
        x: x - cursorWidth / 2,
        y: y - cursorHeight / 2,
      });
    };

    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef} // Attach the ref to the cursor element
      className="fixed pointer-events-none z-50 cursor-none"
      style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
    >
      <div className="text-maud-red p-2 text-xs rounded">{cursorLabel}</div>
    </div>
  );
};

export default CustomCursor;

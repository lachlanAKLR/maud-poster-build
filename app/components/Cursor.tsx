"use client";

import React, { useState, useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursor = (e: MouseEvent): void => {
      const { clientX: x, clientY: y } = e;
      setCursorPosition({
        x: x - (cursorRef.current ? cursorRef.current.offsetWidth / 2 : 0),
        y: y - (cursorRef.current ? cursorRef.current.offsetHeight / 2 : 0),
      });
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the mouse is over a link element
      if (target.tagName === "A" || target.closest("a")) {
        setCursorLabel(""); // Clear the label
      } else {
        const shouldShowPrevious = e.clientX < window.innerWidth / 2;
        setCursorLabel(shouldShowPrevious ? "previous" : "next");
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 cursor-none"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        display: cursorLabel ? "block" : "none",
      }}
    >
      {cursorLabel && (
        <div className="text-maud-red p-2 text-xs rounded">{cursorLabel}</div>
      )}
    </div>
  );
};

export default CustomCursor;

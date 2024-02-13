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
      const screenWidthThird = window.innerWidth / 3;
      const cursorX = e.clientX;

      // Determine if the cursor is over the middle third of the screen
      if (cursorX > screenWidthThird && cursorX < screenWidthThird * 2) {
        setCursorLabel("View Project");
      } else if (target.tagName === "A" || target.closest("a")) {
        // Check if the mouse is over a link element and clear the label if so
        setCursorLabel("");
      } else {
        // Adjust cursor label based on cursor position relative to the screen's width
        const shouldShowPrevious = cursorX < screenWidthThird;
        setCursorLabel(shouldShowPrevious ? "Previous" : "Next");
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
      className="hidden md:block fixed pointer-events-none z-50 cursor-none"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        display: cursorLabel ? "block" : "none",
      }}
    >
      {cursorLabel && (
        <div className="hidden md:block text-maud-red p-2 text-xs rounded">
          {cursorLabel}
        </div>
      )}
    </div>
  );
};

export default CustomCursor;

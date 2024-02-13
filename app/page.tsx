"use client";

import React, { useState } from "react";
import Cursor from "./components/Cursor";
import Carousel from "./components/Carousel";
import TitleAnimation from "./components/TitleAnimation";

export default function ParentComponent() {
  return (
    <div className="bg-maud-black">
      <TitleAnimation title="MAUD" intervalMs={300} />
      <Cursor />
      <Carousel />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PageAnimation from "./components/PageAnimation";
import Cursor from "./components/Cursor";
import Carousel from "./components/Carousel";

export default function ParentComponent() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div className="bg-maud-black">
      <PageAnimation title="MAUD" />
      <Cursor />
      <Carousel />
    </div>
  );
}

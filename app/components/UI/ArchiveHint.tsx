"use client";

import Image from "next/image";
import useMediaQuery from "../Utilities/useMediaQuery";
import React, { useState, useEffect } from "react";

import click from "../../assets/images/web_traffic_FILL0_wght300_GRAD-25_opsz48.svg";
import touch from "../../assets/images/touch_app_white_36dp.svg";

export default function ArchiveHint() {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute inset-0 items-center justify-center ${
        isVisible ? "flex" : "hidden"
      }`}
    >
      <Image src={isSmallScreen ? touch : click} alt="text" />
    </div>
  );
}

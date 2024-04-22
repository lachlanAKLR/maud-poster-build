"use client";

import Image from "next/image";
import useMediaQuery from "../Utilities/useMediaQuery";

import click from "../../assets/images/web_traffic_FILL0_wght300_GRAD-25_opsz48.svg";
import touch from "../../assets/images/touch_app_white_36dp.svg";

export default function ArchiveHint() {
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Image src={isSmallScreen ? touch : click} alt="text" />
    </div>
  );
}

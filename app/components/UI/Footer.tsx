"use client";

import { useState, useEffect } from "react";
import { ProfileType } from "@/types";

interface FooterProps {
  settings: ProfileType[];
}

export default function Footer({ settings }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <footer className="w-full h-40 md:h-10">
      <div className="">
        {settings ? (
          settings.map((data, index) => (
            <div
              className="flex flex-col md:flex-row justify-center items-center pt-7 md:pt-[10px] text-xs gap-2.5"
              key={`settings-${index}`}
            >
              <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 text-center">
                <a href={data.addressOneGroup.addressOneLink} target="blank">
                  {data.addressOneGroup.addressOne}
                </a>
                <a href={data.addressTwoGroup.addressTwoLink} target="blank">
                  {data.addressTwoGroup.addressTwo}
                </a>
              </div>
              <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 text-center">
                <a
                  className="pt-2 md:pt-0"
                  href={`tel:${data.phone}`}
                  target="blank"
                >
                  P {data.phone}
                </a>
                <a href={`mailto:${data.email}`} target="blank">
                  E {data.email}
                </a>
                <a href={data.instagram} target="blank">
                  Instagram
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs">No settings available</p>
        )}
      </div>
    </footer>
  );
}

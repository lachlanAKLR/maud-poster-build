"use client";

import { ProfileType } from "@/types";
import { useState, useEffect } from "react";

interface FooterProps {
  settings: ProfileType[];
}

export default function Footer({ settings }: FooterProps) {
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const [reachedBottom, setReachedBottom] = useState<boolean>(false);
  const [applyClasses, setApplyClasses] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold =
        document.documentElement.scrollHeight - window.innerHeight - 500;
      setShowFooter(scrollPosition > threshold);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setApplyClasses(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight;

      setReachedBottom(scrollPosition >= threshold);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full h-40 md:h-10 bg-maud-grey ${
        applyClasses ? "hidden" : ""
      } ${reachedBottom ? "z-[100]" : "z-[-10]"}  ${
        showFooter ? "block" : "hidden"
      }`}
    >
      <div className="">
        {settings ? (
          settings.map((data, index) => {
            return (
              <div
                className={`flex flex-col md:flex-row justify-center items-center pt-7 md:pt-[10px] text-xs gap-2.5`}
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
            );
          })
        ) : (
          <p className="text-xs">No settings available</p>
        )}
      </div>
    </footer>
  );
}

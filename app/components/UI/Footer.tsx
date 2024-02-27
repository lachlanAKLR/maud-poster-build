"use client";

import { ProfileType } from "@/types";
import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import styled from "styled-components";

const AdressStyle = styled.div`
  br {
    content: " ";
  }
  br:after {
    content: " ";
  }
`;

interface FooterProps {
  settings: ProfileType[];
}

export default function Footer({ settings }: FooterProps) {
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const [reachedBottom, setReachedBottom] = useState<boolean>(false);

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
        reachedBottom ? "z-[100]" : "z-[-10]"
      }  ${showFooter ? "block" : "hidden"}`}
    >
      <AdressStyle>
        <div className="">
          {settings ? (
            settings.map((data, index) => (
              <div
                className={`flex flex-col md:flex-row justify-center items-center gap-0.25 md:gap-1 pt-9 md:pt-[10px]  text-xs`}
                key={index}
              >
                <PortableText value={data.addressOne} />
                <PortableText value={data.addressTwo} />
                <a
                  className="pt-2 md:pt-0"
                  href={`tel:${data.phone}`}
                  target="blank"
                >
                  P {data.phone}
                </a>
                <a href={`mailto:${data.email}`} target="blank">
                  {data.email}
                </a>
                <a href={data.instagram} target="blank">
                  Instagram
                </a>
              </div>
            ))
          ) : (
            <p className="text-xs">No settings available</p>
          )}
        </div>
      </AdressStyle>
    </footer>
  );
}

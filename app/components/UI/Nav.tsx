"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/home";
  const isArchive = pathname === "/archive";
  const isStudio = pathname.includes("/studio");
  const isLanding = pathname === "/";

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY >= window.innerHeight - 0;
      setIsFixed(shouldBeFixed);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHome]);

  if (isLanding) {
    return null;
  }

  return (
    <nav className={`${isStudio ? "hidden" : "block"}`}>
      <div className={`text-xs ${isArchive ? "text-white" : "text-black"}`}>
        <Link
          href="/"
          className={`z-[101] left-[11px] text-xs ${
            isHome
              ? `${isFixed ? "fixed top-[10px]" : "absolute custom-top"}`
              : "fixed top-[10px]"
          }`}
        >
          MAUD, Part of Accenture Song
        </Link>
      </div>
      <div
        className={`z-[101]  right-[12px] text-xs ${
          isHome
            ? `${isFixed ? "fixed top-[10px]" : "absolute custom-top"}`
            : "fixed top-[10px]"
        } ${isArchive ? "text-white" : "text-black"}`}
      >
        <Link href="/work" className="mr-1">
          Work,
        </Link>
        <Link href="/info">Info</Link>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isArchive = pathname === "/archive";

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

  return (
    <nav>
      <div className={`text-xs ${isArchive ? "text-white" : "text-black"}`}>
        <Link
          href="/"
          className={`z-50 left-[10px] text-xs ${
            isHome
              ? `${isFixed ? "fixed top-[10px]" : "absolute custom-top"}`
              : "fixed top-[10px]"
          }`}
        >
          MAUD, Part of Accenture Song
        </Link>
      </div>
      <div
        className={`z-50 right-[10px] text-xs ${
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

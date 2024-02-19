"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();
  const colorClass =
    pathname === "/" || pathname === "/archive" ? "text-white" : "text-black";
  const varTitle = pathname === "/" ? "" : "part of Accenture Song";

  return (
    <nav>
      <div>
        <div>
          <Link
            href="/"
            className={clsx(
              "text-xs fixed top-[10px] left-[5px] z-40",
              colorClass
            )}
          >
            MAUD, {varTitle}
          </Link>
        </div>
        <div className="fixed top-[5px] right-[5px] z-40">
          <Link
            href="/work"
            className={clsx("text-xs mr-1", colorClass, {
              "": pathname === `/work`,
            })}
          >
            Work,
          </Link>
          <Link
            href="/info"
            className={clsx("text-xs", colorClass, {
              "": pathname === `/info`,
            })}
          >
            Info
          </Link>
        </div>
      </div>
    </nav>
  );
}

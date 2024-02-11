"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();
  const colorClass = pathname === "/" ? "text-white" : "text-black";

  return (
    <nav>
      <div className="fixed w-full flex py-1 px-3 z-40 justify-between">
        <div>
          <Link href="/" className={clsx("text-xs", colorClass)}>
            Maud, Part of Accenture Song
          </Link>
        </div>
        <div>
          <Link
            href="/work"
            className={clsx("text-xs mr-1", colorClass, {
              uppercase: pathname === `/work`,
            })}
          >
            Work,
          </Link>
          <Link
            href="/info"
            className={clsx("text-xs", colorClass, {
              uppercase: pathname === `/info`,
            })}
          >
            Info
          </Link>
        </div>
      </div>
    </nav>
  );
}

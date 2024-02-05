"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <div className="fixed w-full flex p-3 z-40 justify-between">
        <div>
          <Link className="text-sm" href="/">
            Maud, Part of Accenture Song
          </Link>
        </div>
        <div>
          <Link
            className={clsx("text-sm mr-1", {
              uppercase: pathname === `/work`,
            })}
            href="/work"
          >
            Work,
          </Link>
          <Link
            className={clsx("text-sm", {
              uppercase: pathname === `/info`,
            })}
            href="/info"
          >
            Info
          </Link>
        </div>
      </div>
    </nav>
  );
}

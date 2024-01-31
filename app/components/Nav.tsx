import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <div className="flex p-5 justify-center">
        <Link className="px-5" href="/">
          Home
        </Link>
        <Link className="px-5" href="/work">
          Work
        </Link>
        <Link className="px-5" href="/about">
          About
        </Link>
        <Link className="px-5" href="/contact">
          Contact
        </Link>
      </div>
    </nav>
  );
}

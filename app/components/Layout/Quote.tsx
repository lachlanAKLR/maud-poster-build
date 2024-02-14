import { PortableText } from "@portabletext/react";
import { herbik } from "@/app/fonts";
import { unica } from "@/app/fonts";

export default function Quote({ block }: { block: any }) {
  return (
    <div className="block md:grid grid-cols-10 py-36 md:py-72 px-3 md:px-20 gap-x-20">
      <div
        className={`${herbik.className} col-start-2 col-span-8 text-lg md:text-xl`}
      >
        {block ? <PortableText value={block.text} /> : null}
        <p className={`${unica.className} text-xs md:text-sm pt-6 md:pt-10`}>
          {block.author}
        </p>
      </div>
    </div>
  );
}

import { PortableText } from "@portabletext/react";
import { herbik } from "@/app/fonts";
import { unica } from "@/app/fonts";

export default function Quote({ block }: { block: any }) {
  return (
    <div className="grid grid-cols-10 py-72 px-20 gap-x-20">
      <div className={`${herbik.className} col-start-2 col-span-8 text-5xl`}>
        {block ? <PortableText value={block.text} /> : null}
        <p className={`${unica.className} text-sm pt-10`}>{block.author}</p>
      </div>
    </div>
  );
}

import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function PortraitImage({ block }: { block: any }) {
  return (
    <div className="grid grid-cols-10 py-10 px-20 gap-x-20">
      {block.image ? (
        <Image
          className="w-full aspect-4/5 object-cover col-start-3 col-span-6 bg-maud-grey"
          src={builder
            .image(block.image)
            .width(2000)
            .height(3000)
            .quality(100)
            .url()}
          width={2000}
          height={3000}
          alt={block.image.alt || ""}
          blurDataURL="data:..."
          placeholder="blur"
          sizes="100vw"
        />
      ) : null}
    </div>
  );
}

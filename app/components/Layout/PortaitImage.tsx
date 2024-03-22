import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function PortraitImage({ block }: { block: any }) {
  return (
    <div className="block md:grid grid-cols-10 py-1.5 md:py-10 px-3 md:px-20 gap-x-20">
      {block.image ? (
        <Image
          className="w-full aspect-3/4 object-cover col-start-3 col-span-6 bg-maud-grey"
          src={builder
            .image(block.image)
            .width(2000)
            .height(3000)
            .quality(100)
            .url()}
          width={2000}
          height={3000}
          alt={block.image.alt || ""}
          placeholder="empty"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 50vw"
        />
      ) : null}
    </div>
  );
}

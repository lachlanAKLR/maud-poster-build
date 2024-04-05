import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function LandscapeImage({ block }: { block: any }) {
  return (
    <div className="w-full py-1.5 md:py-10 px-3 md:px-20">
      {block.image ? (
        <Image
          className="bg-maud-grey"
          src={builder
            .image(block.image)
            .width(3000)
            .height(2000)
            .quality(100)
            .url()}
          width={3000}
          height={2000}
          alt={block.image.alt || ""}
          placeholder="empty"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 70vw, 70vw"
        />
      ) : null}
    </div>
  );
}

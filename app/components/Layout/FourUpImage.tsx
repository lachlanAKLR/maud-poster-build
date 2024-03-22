import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function FourUpImage({ block }: { block: any }) {
  return (
    <div className="grid grid-cols-10 py-1.5 md:py-10 px-3 md:px-20 gap-x-3 md:gap-x-20 gap-y-3 md:gap-y-20">
      {block.topLeftImage ? (
        <Image
          className="aspect-3/2 col-start-1 col-span-5 bg-maud-grey"
          src={builder
            .image(block.topLeftImage)
            .width(3000)
            .height(2000)
            .quality(100)
            .url()}
          width={3000}
          height={2000}
          alt={block.topLeftImage.alt || ""}
          placeholder="empty"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 50vw"
        />
      ) : null}
      {block.topRightImage ? (
        <Image
          className="aspect-3/2 col-span-5 bg-maud-grey"
          src={builder
            .image(block.topRightImage)
            .width(3000)
            .height(2000)
            .quality(100)
            .url()}
          width={3000}
          height={2000}
          alt={block.topRightImage.alt || ""}
          placeholder="empty"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 50vw"
        />
      ) : null}
      {block.bottomLeftImage ? (
        <Image
          className="aspect-3/2 col-start-1 col-span-5 bg-maud-grey"
          src={builder
            .image(block.bottomLeftImage)
            .width(3000)
            .height(2000)
            .quality(100)
            .url()}
          width={3000}
          height={2000}
          alt={block.bottomLeftImage.alt || ""}
          placeholder="empty"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 50vw"
        />
      ) : null}
      {block.bottomRightImage ? (
        <Image
          className="aspect-3/2 col-span-5 bg-maud-grey"
          src={builder
            .image(block.bottomRightImage)
            .width(3000)
            .height(2000)
            .quality(100)
            .url()}
          width={3000}
          height={2000}
          alt={block.bottomRightImage.alt || ""}
          placeholder="empty"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 50vw"
        />
      ) : null}
    </div>
  );
}

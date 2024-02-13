import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function TwoUpImage({ block }: { block: any }) {
  return (
    <div className="grid grid-cols-10 py-10 px-20 gap-x-20">
      {block.leftImage ? (
        <Image
          className="aspect-2/3 col-start-1 col-span-5 bg-maud-grey"
          src={builder
            .image(block.leftImage)
            .width(2000)
            .height(3000)
            .quality(100)
            .url()}
          width={2000}
          height={3000}
          alt={block.leftImage.alt || ""}
          blurDataURL="data:..."
          placeholder="blur"
          sizes="100vw"
        />
      ) : null}
      {block.rightImage ? (
        <Image
          className="aspect-2/3 col-span-5 bg-maud-grey"
          src={builder
            .image(block.rightImage)
            .width(2000)
            .height(3000)
            .quality(100)
            .url()}
          width={2000}
          height={3000}
          alt={block.rightImage.alt || ""}
          blurDataURL="data:..."
          placeholder="blur"
          sizes="100vw"
        />
      ) : null}
    </div>
  );
}

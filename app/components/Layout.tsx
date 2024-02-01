import React from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export function SingleImage({ block }: { block: any }) {
  return (
    <div>
      {block.image ? (
        <Image
          className="w-full rounded-lg"
          src={builder
            .image(block.image)
            .width(1080)
            .height(1080)
            .quality(100)
            .url()}
          width={1000}
          height={1000}
          alt={block.image.alt || ""}
        />
      ) : null}
    </div>
  );
}

export function TwoUpImage({ block }: { block: any }) {
  return (
    <div className="flex justify-center py-10 gap-x-9">
      {block.leftImage ? (
        <Image
          className="w-2/3 rounded-lg"
          src={builder
            .image(block.leftImage)
            .width(1080)
            .height(1080)
            .quality(100)
            .url()}
          width={300}
          height={300}
          alt={block.leftImage.alt || ""}
        />
      ) : null}
      {block.rightImage ? (
        <Image
          className="w-2/3 rounded-lg"
          src={builder
            .image(block.rightImage)
            .width(1080)
            .height(1080)
            .quality(100)
            .url()}
          width={300}
          height={300}
          alt={block.rightImage.alt || ""}
        />
      ) : null}
    </div>
  );
}

export default function Layout({ layouts }: { layouts: any[] }) {
  const Components: { [key: string]: React.ComponentType<any> } = {
    singleImage: SingleImage,
    twoUpImage: TwoUpImage,
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {layouts.map((block, index) => {
        if (Components[block._type]) {
          return React.createElement(Components[block._type], {
            key: block._key,
            block,
            index,
          });
        }
        return null;
      })}
    </div>
  );
}

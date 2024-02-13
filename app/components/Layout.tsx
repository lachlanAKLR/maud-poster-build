import React from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Quote from "./Layout/Quote";
import VideoBlock from "./Layout/VideoBlock";

import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

// —————————— Video —————————— //
// export function Video({ block }: { block: any }) {
//   return (
//     <div className="relative w-full h-fit py-10 px-20">
//       <video
//         className="inset-0 w-full h-fit bg-maud-grey"
//         autoPlay
//         playsInline
//         muted
//         loop
//         poster={builder.image(block.videoPoster).quality(50).url()}
//       >
//         <source src={block.videoUrl} type="video/mp4" />
//       </video>
//     </div>
//   );
// }

// —————————— Portrait Image —————————— //
export function PortraitImage({ block }: { block: any }) {
  return (
    <div className="grid grid-cols-10 py-10 px-20 gap-x-20">
      {block.image ? (
        <Image
          className="w-full aspect-4/5 object-cover col-start-3 col-span-6"
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
        />
      ) : null}
    </div>
  );
}

// —————————— Landscape Image —————————— //
export function LandscapeImage({ block }: { block: any }) {
  return (
    <div>
      {block.image ? (
        <Image
          className="w-full aspect-3/2 object-cover py-10 px-20"
          src={builder
            .image(block.image)
            .width(3000)
            .height(2000)
            .quality(100)
            .url()}
          width={3000}
          height={2000}
          alt={block.image.alt || ""}
          blurDataURL="data:..."
          placeholder="blur"
        />
      ) : null}
    </div>
  );
}

// —————————— Two Up Image —————————— //
export function TwoUpImage({ block }: { block: any }) {
  return (
    <div className="grid grid-cols-10 py-10 px-20 gap-x-20">
      {block.leftImage ? (
        <Image
          className="aspect-2/3 col-start-1 col-span-5"
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
        />
      ) : null}
      {block.rightImage ? (
        <Image
          className="aspect-2/3 col-span-5"
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
        />
      ) : null}
    </div>
  );
}

export default function Layout({ layouts }: { layouts: any[] }) {
  const Components: { [key: string]: React.ComponentType<any> } = {
    landscapeImage: LandscapeImage,
    twoUpImage: TwoUpImage,
    portraitImage: PortraitImage,
    quote: Quote,
    video: VideoBlock,
  };

  return (
    <div className="text-center">
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

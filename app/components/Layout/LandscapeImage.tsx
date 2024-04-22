// import imageUrlBuilder from "@sanity/image-url";
// import Image from "next/image";
// import { dataset, projectId } from "@/sanity/env";

// const builder = imageUrlBuilder({ projectId, dataset });

// export default function LandscapeImage({ block }: { block: any }) {
//   console.log(block);
//   return (
//     <div className="w-full py-1.5 md:py-10 px-3 md:px-20">
//       {block.image ? (
//         <Image
//           className="bg-maud-grey"
//           src={builder
//             .image(block.image)
//             .width(3000)
//             .height(2000)
//             .quality(100)
//             .url()}
//           width={3000}
//           height={2000}
//           alt={block.image.alt || ""}
//           placeholder="empty"
//           sizes="(max-width: 600px) 100vw, (max-width: 900px) 70vw, 70vw"
//         />
//       ) : null}
//     </div>
//   );
// }

import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function LandscapeImage({ block }: { block: any }) {
  const { image } = block;

  const match = image.asset._ref.match(/(\d+)x(\d+)-jpg$/);
  const width = match ? parseInt(match[1], 10) : 3000;
  const height = match ? parseInt(match[2], 10) : 1800;
  const aspectRatio = width / height;

  const imageUrl = builder
    .image(image)
    .width(width)
    .height(height)
    .quality(100)
    .url();

  return (
    <div className="w-full py-1.5 md:py-10 px-3 md:px-20">
      {imageUrl ? (
        <Image
          className="bg-maud-grey"
          src={imageUrl}
          width={width}
          height={height}
          alt={image.alt || "No description"}
          placeholder="empty"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 70vw, 70vw"
        />
      ) : null}
    </div>
  );
}

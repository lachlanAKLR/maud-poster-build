import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

interface ImageBlock {
  alt?: string;
  videoUrl?: string;
}

interface Block {
  topLeftImage?: ImageBlock;
  topRightImage?: ImageBlock;
  bottomLeftImage?: ImageBlock;
  bottomRightImage?: ImageBlock;
}

interface FourUpImageProps {
  block: Block;
}

function renderMedia(
  imageBlock: ImageBlock | undefined,
  className: string
): JSX.Element | null {
  if (!imageBlock) return null;

  return imageBlock.videoUrl ? (
    <div className={className}>
      <video
        className="inset-0 w-full h-full bg-maud-grey"
        autoPlay
        playsInline
        muted
        loop
        poster={builder.image(imageBlock).quality(50).url()}
      >
        <source src={imageBlock.videoUrl} type="video/mp4" />
      </video>
    </div>
  ) : (
    <Image
      className={`${className} aspect-3/2 bg-maud-grey`}
      src={builder
        .image(imageBlock)
        .width(3000)
        .height(2000)
        .quality(100)
        .url()}
      width={3000}
      height={2000}
      alt={imageBlock.alt || ""}
      placeholder="empty"
      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 50vw"
    />
  );
}

export default function FourUpImage({ block }: FourUpImageProps) {
  return (
    <div className="grid grid-cols-10 py-1.5 md:py-10 px-3 md:px-20 gap-x-3 md:gap-x-20 gap-y-3 md:gap-y-20">
      {renderMedia(block.topLeftImage, "col-start-1 col-span-5")}
      {renderMedia(block.topRightImage, "col-span-5")}
      {renderMedia(block.bottomLeftImage, "col-start-1 col-span-5")}
      {renderMedia(block.bottomRightImage, "col-span-5")}
    </div>
  );
}

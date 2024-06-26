import { SanityDocument } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

interface ArchiveThumbProps {
  data: SanityDocument;
  index: number;
  dynamicWidth?: number;
}

export default function ArchiveThumbImg({
  data,
  index,
  dynamicWidth,
}: ArchiveThumbProps) {
  const videoUrl = data.archiveImage.videoUrl;
  const imageUrl = data.archiveImage.image;

  const widthStyle = dynamicWidth
    ? {
        width: `${dynamicWidth}px`,
      }
    : {};

  return videoUrl ? (
    <div
      className={`w-0 ${
        data.archiveImage.ratio === "square"
          ? "aspect-[1/1]"
          : data.archiveImage.ratio === "landscape"
          ? "aspect-[4/3]"
          : "aspect-[3/4]"
      }`}
      style={widthStyle}
    >
      <img
        src={builder.image(data.archiveImage.image).quality(100).url()}
        alt=""
        className="object-cover"
      />
    </div>
  ) : (
    <div
      className="pointer-events-none w-[300px] object-cover"
      style={widthStyle}
    >
      <img src={imageUrl} alt="" />
    </div>
  );
}

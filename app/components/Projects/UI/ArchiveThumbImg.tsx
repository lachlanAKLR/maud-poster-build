import { SanityDocument } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import Video from "./Video";

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
    <div className="aspect-3/2 w-0" style={widthStyle}>
      <Video
        videoUrl={videoUrl}
        poster={builder.image(data.archiveImage.image).quality(100).url()}
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

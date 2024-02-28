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

export default function ArchiveThumb({
  data,
  index,
  dynamicWidth,
}: ArchiveThumbProps) {
  const videoUrl = data.archiveImage.videoUrl;

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
    <div className="pointer-events-none w-0 object-cover" style={widthStyle}>
      <Image
        className="object-cover"
        src={builder.image(data.archiveImage.image).quality(100).url()}
        width={3000}
        height={3000}
        quality={100}
        alt={data.archiveImage.alt || ""}
        priority={index >= 0 && index <= 2}
        placeholder="empty"
        sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 33vw"
      />
    </div>
  );
}

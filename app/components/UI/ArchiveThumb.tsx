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

export default function ArchiveThumb({
  data,
  index,
  dynamicWidth,
}: ArchiveThumbProps) {
  const widthStyle = dynamicWidth ? { width: `${dynamicWidth}px` } : {};

  return (
    <div
      className={`m-auto pointer-events-none w-0 ${
        data.archiveImage.ratio === "square"
          ? "w-full"
          : data.archiveImage.ratio === "landscape"
          ? "w-3/4"
          : "w-8/12"
      }`}
      style={widthStyle}
    >
      <Image
        className={`object-cover ${
          data.archiveImage.ratio === "square"
            ? "aspect-[1/1]"
            : data.archiveImage.ratio === "landscape"
            ? "aspect-[4/3]"
            : "aspect-[3/4]"
        }`}
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

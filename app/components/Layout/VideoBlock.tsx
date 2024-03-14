import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function VideoBlock({ block }: { block: any }) {
  return (
    <div className="relative w-full h-full md:h-fit py-1.5 md:py-10 px-3 md:px-20">
      <video
        className="inset-0 w-full h-full  bg-maud-grey"
        autoPlay
        playsInline
        muted
        loop
        poster={
          block.videoPoster
            ? builder.image(block.videoPoster).quality(50).url()
            : ""
        }
      >
        <source src={block.videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}

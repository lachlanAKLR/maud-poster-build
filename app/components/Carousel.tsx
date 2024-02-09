import { getCarouselItems } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";

const builder = imageUrlBuilder({ projectId, dataset });

interface CarouselItemProps {
  item: any;
}

function CarouselItem({ item }: CarouselItemProps) {
  return (
    <div className="relative">
      <Image
        className="relative w-full h-auto"
        src={builder.image(item.featuredImage).quality(100).url()}
        width={3000}
        height={3000}
        quality={100}
        alt={item.featuredImage.alt || ""}
        priority
        blurDataURL="data:..."
        placeholder="blur"
      />
      <div className="absolute left-1 bottom-1 z-10">
        <div className="text-center text-white">
          <p>
            <span className="uppercase mr-2">{item.title}</span>
            {item.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function Carousel() {
  const content: ProfileType[] = await getCarouselItems();

  if (content.length > 0 && content[0].carousel) {
    const carouselJSX = content[0].carousel.map((item) => {
      return <CarouselItem key={item._id} item={item} />;
    });

    return <div>{carouselJSX}</div>;
  }

  return null;
}

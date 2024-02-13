import { PortableTextBlock } from "sanity";

export type CarouselImageType = {
  alt: string;
  image: string;
};

export type CarouselItemType = {
  _id: string;
  title: string;
  subtitle?: string;
  featuredImage?: string;
  image: CarouselImageType;
};

export type ProfileType = {
  _id: string;
  title: string;
  infoText: PortableTextBlock[];
  image: {
    alt: string;
    image: string;
  };
  phone: string;
  email: string;
  instagram: string;
  addressOne: PortableTextBlock[];
  addressTwo: PortableTextBlock[];
  videoUrl: string;
  carousel: CarouselItemType[];
  slug: string;
  subtitle: string;
};

export type Tag = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};

export type Project = {
  _id: string;
  slug: { current: string };
  thumbnailImage?: {
    videoUrl?: string;
    ratio?: "square" | "landscape" | "portrait";
    alt?: string;
  };
  title?: string;
  subtitle: string;
};

export type SingleProjectProps = {
  project: Project;
  index: number;
};

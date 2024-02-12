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
};

export type Tag = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};

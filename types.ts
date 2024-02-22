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
  carouselContent?: CarouselItemType[];
  slug: string;
  subtitle: string;
  metaImage: {
    alt: string;
    image: string;
  };
  isHome?: boolean;
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

export type CarouselItemProps = {
  item: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    subtitle?: string;
    featuredImage: {
      asset: {
        _ref: string;
      };
      alt?: string;
      videoUrl?: string;
      featuredPortrait?: {
        image: string;
      };
    };
  };
  isVisible: boolean;
  index: number;
  indexLength: number;
  onFadeOut?: () => void;
};

export type ArchiveImageAsset = {
  _id: string;
  url: string;
};

export type ArchiveImage = {
  _key?: string;
  _id?: string;
  _type: "image";
  alt: string;
  ratio: "square" | "landscape" | "portrait";
  videoUrl?: string;
  asset: ArchiveImageAsset;
};

export type ArchiveDocument = {
  _id: string;
  archiveImage: ArchiveImage;
  image?: {
    alt: string;
    image: string;
    videoUrl?: string;
    ratio: "square" | "landscape" | "portrait";
  };
};

export type ArchiveQueryResult = ArchiveDocument[];

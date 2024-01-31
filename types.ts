import { PortableTextBlock } from "sanity";

export type ProfileType = {
  _id: string;
  title: string;
  contactText: PortableTextBlock[];
  heroImage: {
    alt: string;
    image: string;
  };
};

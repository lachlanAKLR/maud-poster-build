import { PortableTextBlock } from "sanity";

// Define a type for the structure of the image within carousel items
export type CarouselImageType = {
  alt: string;
  image: string; // Assuming this is the URL of the image
};

// Define a type for the structure of each carousel item
export type CarouselItemType = {
  _id: string;
  title: string;
  subtitle?: string; // Optional because it might not be present in all items
  featuredImage?: string; // This is also optional for the same reason
  image: CarouselImageType; // This matches the structure within your query
};

// Extend the ProfileType to include the carousel
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
  carousel: CarouselItemType[]; // Add this line to include the carousel
};

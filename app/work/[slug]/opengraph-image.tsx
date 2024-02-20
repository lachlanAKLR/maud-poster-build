/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";
import { loadQuery } from "@/sanity/lib/store"; // Use your loadQuery function
import { QueryParams, SanityDocument } from "next-sanity";
import { PROJECT_QUERY } from "@/sanity/lib/queries"; // Ensure this query fetches the required image data
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export const runtime = "edge";

export const alt = "Dynamic Project Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  // Use the loadQuery method similar to your page.tsx
  const initial = await loadQuery<SanityDocument>(
    PROJECT_QUERY,
    { slug: params.slug },
    {}
  );

  const imageUrl = builder.image(initial.data.featuredImage).quality(100).url(); // Direct link to the image

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center">
        <img src={`${imageUrl}`} alt={initial.data.title} />
      </div>
    ),
    { ...size }
  );
}

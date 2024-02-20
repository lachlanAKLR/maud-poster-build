import { ImageResponse } from "next/og";
import { loadQuery } from "@/sanity/lib/store"; // Use your loadQuery function
import { QueryParams, SanityDocument } from "next-sanity";
import { PROJECT_QUERY } from "@/sanity/lib/queries"; // Ensure this query fetches the required image data

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

  const imageUrl = initial.data.featuredImage.image; // Direct link to the image

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: `url('${imageUrl}') no-repeat center center`,
          backgroundSize: "cover",
          color: "white", // Ensure text color contrasts with the image
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {initial.data.title}
      </div>
    ),
    { ...size }
  );
}

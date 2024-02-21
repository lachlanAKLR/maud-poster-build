/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import { getSettings } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";

const builder = imageUrlBuilder({ projectId, dataset });

export const runtime = "edge";

export const alt = "Dynamic Project Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const settings: ProfileType[] = await getSettings();
  const metaImageUrl = settings[0].metaImage.image;

  const imageUrl = builder.image(metaImageUrl).quality(50).url();

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center">
        <img src={imageUrl} alt={settings[0].metaImage.alt} />
      </div>
    ),
    { ...size }
  );
}

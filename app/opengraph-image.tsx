/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Share Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center">
        <img src="../assets/images/Social_Share_01.png" alt="MAUD" />
      </div>
    ),
    { ...size }
  );
}

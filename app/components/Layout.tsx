import React from "react";
import Quote from "./Layout/Quote";
import VideoBlock from "./Layout/VideoBlock";
import PortraitImage from "./Layout/PortaitImage";
import LandscapeImage from "./Layout/LandscapeImage";
import TwoUpImage from "./Layout/TwoUpImage";

export default function Layout({ layouts }: { layouts: any[] }) {
  const Components: { [key: string]: React.ComponentType<any> } = {
    landscapeImage: LandscapeImage,
    twoUpImage: TwoUpImage,
    portraitImage: PortraitImage,
    quote: Quote,
    video: VideoBlock,
  };

  return (
    <div className="text-center">
      {layouts.map((block, index) => {
        if (Components[block._type]) {
          return React.createElement(Components[block._type], {
            key: block._key,
            block,
            index,
          });
        }
        return null;
      })}
    </div>
  );
}

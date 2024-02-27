import React from "react";
import Quote from "./Quote";
import VideoBlock from "./VideoBlock";
import PortraitImage from "./PortaitImage";
import LandscapeImage from "./LandscapeImage";
import TwoUpImage from "./TwoUpImage";

export default function Layout({ layouts }: { layouts: any[] }) {
  const Components: { [key: string]: React.ComponentType<any> } = {
    landscapeImage: LandscapeImage,
    twoUpImage: TwoUpImage,
    portraitImage: PortraitImage,
    quote: Quote,
    video: VideoBlock,
  };

  return (
    <div>
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

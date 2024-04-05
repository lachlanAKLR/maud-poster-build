import { ProfileType } from "@/types";
import HomeVideo from "./components/UI/HomeVideo";
import { loadQuery } from "@/sanity/lib/store";
import { SanityDocument } from "next-sanity";
import { getSettings } from "@/sanity/lib/queries";
import { HOME_QUERY } from "@/sanity/lib/queries";
import React from "react";
import addLineBreaks from "./components/Utilities/addLineBreaks";
import Video from "./components/UI/Video";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default async function Page() {
  const homeContent = await loadQuery<SanityDocument[]>(HOME_QUERY);
  const settings: ProfileType[] = await getSettings();

  const hideAnimation = homeContent.data[0].hideAnimation;

  return (
    <div className="flex flex-col h-dvh md:h-screen justify-between text-xs">
      {settings &&
        settings.map((data) => (
          <div
            key={data._id}
            className="flex flex-col md:grid md:grid-cols-12 gap-x-5 p-2.5 md:p-2.5 gap-y-5 md:gap-y-0"
          >
            <div className="col-span-6 pb-10">MAUD, Part of Accenture Song</div>
            <div className="col-span-2">
              <h4>
                <span className="mr-[10px] md:mr-[15px]">P</span>
                <a href={`tel:${data.phone}`}>{data.phone}</a>
              </h4>
              <h4>
                <span className="mr-[10px] md:mr-[15px]">E</span>
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </h4>
              <h4>
                <span className="mr-[8px] md:mr-[13px]">→</span>
                <a target="blank" href={data.instagram}>
                  Instagram
                </a>
              </h4>
            </div>
            <div className="col-span-2">
              <a href={data.addressOneGroup.addressOneLink} target="blank">
                {addLineBreaks(data.addressOneGroup.addressOne)}
              </a>
            </div>
            <div className="col-span-2">
              <a href={data.addressTwoGroup.addressTwoLink} target="blank">
                {addLineBreaks(data.addressTwoGroup.addressTwo)}
              </a>
            </div>
          </div>
        ))}
      <div className="md:grid md:grid-cols-12 gap-x-5 p-2.5 md:p-2.5">
        <div className="col-start-7 col-end-13 aspect-3/2">
          {homeContent.data.map((data, index) => (
            <Video
              key={`home-video-${index}`}
              videoUrl={data.videoUrl}
              poster={
                data.videoPosterUrl
                  ? builder.image(data.videoPosterUrl).quality(50).url()
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

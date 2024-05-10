import { getInfo, getSettings } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import TitleAnimation from "../components/UI/TitleAnimation";
import { herbik } from "@/app/fonts";
import addLineBreaks from "../components/Utilities/addLineBreaks";

const components = {
  block: {
    // @ts-ignore
    h2: ({ children }) => (
      <h2 className={`${herbik.className} text-center text-lg md:text-xl pb-5`}>
        {children}
      </h2>
    ),
  },
};

export default async function Page() {
  const content: ProfileType[] = await getInfo();
  const settings: ProfileType[] = await getSettings();

  return (
    <>
      <TitleAnimation title="INFO" intervalMs={300} />
      <div className="h-screen flex flex-col justify-center align-middle">
        {content &&
          content.map((data) => (
            <div
              className="flex flex-col md:grid md:grid-cols-8 gap-x-10 px-4 md:px-0"
              key={data._id}
            >
              <div className="col-start-2 col-span-6">
                {/* @ts-ignore */}
                <PortableText value={data.infoText} components={components} />
              </div>
            </div>
          ))}
        {settings &&
          settings.map((data) => (
            <div
              className="flex flex-col md:flex-row md:align-middle md:justify-center gap-x-10 pt-5 md:pt-10 pb-0 w-full"
              key={data._id}
            >
              <div className="flex flex-col md:gap-10 gap-5 md:flex-row justify-center text-center text-xs">
                <div className="w-full md:w-[180px]">
                  <h4>
                    <span className="mr-1">P</span>
                    <a href={`tel:${data.phone}`}>{data.phone}</a>
                  </h4>
                  <h4>
                    <span className="mr-1">E</span>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  </h4>
                  <h4>
                    <span className="mr-1">→</span>
                    <a target="blank" href={data.instagram}>
                      Instagram
                    </a>
                  </h4>
                </div>
                <div className="w-full md:w-[180px]">
                  <a href={data.addressOneGroup.addressOneLink} target="blank">
                    {addLineBreaks(data.addressOneGroup.addressOne)}
                  </a>
                </div>
                <div className="w-full md:w-[180px]">
                  <a href={data.addressTwoGroup.addressTwoLink} target="blank">
                    {addLineBreaks(data.addressTwoGroup.addressTwo)}
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

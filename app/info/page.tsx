import { getInfo, getSettings } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import TitleAnimation from "../components/UI/TitleAnimation";
import { herbik } from "@/app/fonts";

export default async function Page() {
  const content: ProfileType[] = await getInfo();
  const settings: ProfileType[] = await getSettings();

  return (
    <>
      <TitleAnimation title="INFO" intervalMs={300} />

      {content &&
        content.map((data) => (
          <div
            className="text-center flex px-8 md:px-0 md:grid grid-cols-6 gap-x-20 pt-24 md:pt-40 pb-5 md:pb-10"
            key={data._id}
          >
            <div className="col-start-2 col-span-4">
              <div className={` ${herbik.className} text-lg md:text-xl`}>
                <PortableText value={data.infoText} />
              </div>
            </div>
          </div>
        ))}
      {settings &&
        settings.map((data) => (
          <div
            className="flex flex-col md:grid md:grid-cols-8 gap-x-10 pt-5 md:pt-10 pb-10"
            key={data._id}
          >
            <div className="flex flex-col gap-10 md:flex-row justify-center text-center md:col-start-3 md:col-span-4 text-xs">
              <div className="w-full md:w-1/3">
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
              <div className="w-full md:w-1/3">
                <PortableText value={data.addressOne} />
              </div>
              <div className="w-full md:w-1/3">
                <PortableText value={data.addressTwo} />
              </div>
            </div>
          </div>
        ))}
      {content &&
        content.map((data) => (
          <div className="grid grid-cols-8 gap-x-10 pb-10 pt-10" key={data._id}>
            <Image
              className="col-start-2 col-span-6 object-cover bg-top"
              src={data.image.image}
              width={2000}
              height={2000}
              quality={100}
              alt={data.image.alt}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 50vw"
            />
          </div>
        ))}
    </>
  );
}

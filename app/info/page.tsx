import { getInfo, getSettings } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import PageAnimation from "../components/PageAnimation";

export default async function Page() {
  const content: ProfileType[] = await getInfo();
  const settings: ProfileType[] = await getSettings();
  const title = `INFO`;
  const videoId = `877781990`;

  return (
    <main className="bg-maud-red min-h-screen">
      <PageAnimation title={title} />
      {content &&
        content.map((data) => (
          <div
            className="text-center grid grid-cols-6 gap-x-20 pt-40 pb-10"
            key={data._id}
          >
            <div className="col-start-2 col-span-4">
              <div className="max-w-3xl m-auto">
                <PortableText value={data.infoText} />
              </div>
            </div>
          </div>
        ))}
      {settings &&
        settings.map((data) => (
          <div className="grid grid-cols-8 gap-x-10 pt-10 pb-10" key={data._id}>
            <div className="flex justify-center text-center col-start-3 col-span-4">
              <div className="w-1/3">
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
              <div className="w-1/3">
                <PortableText value={data.addressOne} />
              </div>
              <div className="w-1/3">
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
            />
          </div>
        ))}
    </main>
  );
}

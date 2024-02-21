import { ProfileType } from "@/types";
import { getSettings } from "@/sanity/lib/queries";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({ projectId, dataset });

export default async function Footer() {
  const settings: ProfileType[] = await getSettings();

  return (
    <footer className="text-center">
      <div className="grid grid-cols-8 gap-x-10 pt-10">
        {settings &&
          settings.map((data) => (
            <div
              key={data._id}
              className="flex justify-center text-center col-start-1 col-span-8"
            >
              <div className="text-sm">
                <h3 className="py-20">
                  Got a project in mind?
                  <br />
                  Email us at
                  <a href={`mailto:${data.email}`}> {data.email}</a>
                </h3>
                {data.image ? (
                  <Image
                    className="w-full object-cover"
                    src={builder.image(data.image.image).quality(100).url()}
                    width={3000}
                    height={3000}
                    quality={100}
                    alt={data.image.alt || ""}
                    priority
                    placeholder="empty"
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 100vw, 100vw"
                  />
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </footer>
  );
}

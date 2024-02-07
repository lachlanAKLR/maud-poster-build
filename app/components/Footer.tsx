import { ProfileType } from "@/types";
import { getSettings } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export default async function Footer() {
  const settings: ProfileType[] = await getSettings();

  return (
    <footer className="text-center ">
      <div className="grid grid-cols-8 gap-x-10 pt-10 pb-10">
        {settings &&
          settings.map((data) => (
            <div
              key={data._id}
              className="flex justify-center text-center col-start-3 col-span-4"
            >
              <div className="text-sm">
                <h3>
                  Got a project in mind?
                  <br />
                  Email us at
                  <a href={`mailto:${data.email}`}> {data.email}</a>
                </h3>
              </div>
            </div>
          ))}
      </div>
    </footer>
  );
}

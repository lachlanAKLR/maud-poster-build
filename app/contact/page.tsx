import { getContact } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export default async function Page() {
  const content: ProfileType[] = await getContact();

  return (
    <main className="px-10">
      {content &&
        content.map((data) => (
          <div className="text-center" key={data._id}>
            <h1 className="text-xl w-full py-10">{data.title}</h1>
            <div className="py-10">
              <PortableText value={data.contactText} />
            </div>
            <Image
              className="rounded-2xl mb-4 object-cover bg-top bg-maud-brown"
              src={data.heroImage.image}
              width={2000}
              height={2000}
              quality={100}
              alt="image"
            />
          </div>
        ))}
    </main>
  );
}

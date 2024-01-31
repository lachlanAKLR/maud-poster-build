import { getContact } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export default async function Page() {
  const content: ProfileType[] = await getContact();

  return (
    <div>
      {content &&
        content.map((data) => (
          <div key={data._id}>
            {data.title}
            <PortableText value={data.contactText} />
            <Image
              className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top bg-[#1d1d20]"
              src={data.heroImage.image}
              width={1000}
              height={1000}
              quality={100}
              alt="image"
            />
          </div>
        ))}
    </div>
  );
}

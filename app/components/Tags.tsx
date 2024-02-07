import { SanityDocument } from "next-sanity";
import Link from "next/link";

export default function Tags({ tags }: { tags: SanityDocument[] }) {
  console.log(tags);
  return (
    <div>
      {tags.map((tag: any, i) => (
        <p key={i}>Tag{tag.slug}</p>
      ))}
    </div>
  );
}

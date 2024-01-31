// ./sanity/lib/queries.ts

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;

export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)]`;

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]`;

export async function getContact() {
  return client.fetch(
    groq`*[_type == "contact"]{
              _id,
              title,
              heroImage,
              contactText,
              heroImage {alt, "image": asset->url},
            }`
  );
}

// ./sanity/lib/queries.ts

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)]|order(orderRank)`;

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]`;

export async function getInfo() {
  return client.fetch(
    groq`*[_type == "info"]{
              _id,
              infoText,
              image,
              image {alt, "image": asset->url},
            }`
  );
}

export async function getSettings() {
  return client.fetch(
    groq`*[_type == "settings"]{
              _id,
              phone,
              email,
              instagram,
              addressOne,
              addressTwo,
            }`
  );
}

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export const PROJECTS_QUERY = groq`
*[_type == "project" && defined(slug)]|order(orderRank){
  ...,
  tags[]->{
    _id,
    title,
    slug
  },
}`;

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]`;

export const HOME_QUERY = groq`*[_type == "home"]{
  _id,
  videoUrl,
  hideAnimation,
  "videoPosterUrl": videoPoster.asset->url,
}`;

export const ARCHIVE_QUERY = groq`*[_type == "archive"]{
  _id,
  archiveImage,
  archiveImage {alt, "image": asset->url, videoUrl, ratio},
}`;

export async function getInfo() {
  return client.fetch(
    groq`*[_type == "info"]{
      _id,
      infoText,
      image,
      "image": {
        alt,
        "image": image.asset->url,
      }
    }`
  );
}

export async function getHome() {
  return client.fetch(
    groq`*[_type == "home"]{
              _id,
              videoUrl, 
              hideAnimation,
              "videoPosterUrl": videoPoster.asset->url,
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
              addressOneGroup,
              addressTwoGroup,
              image,
              image {alt, "image": asset->url},
              metaImage,
              metaImage {alt, "image": asset->url},
            }`
  );
}

export async function getCarouselItems() {
  return client.fetch(
    groq`*[_type == "home"]{
      "carousel": carousel[]->{
        _id,
        title,
        slug,
        subtitle,
        featuredImage,
        image {alt, "image": asset->url, videoUrl},
       }
    }`
  );
}

export async function getTags() {
  return client.fetch(
    groq`*[_type == "tags"]|order(orderRank){
              _id,
              title,
              slug,
            }`
  );
}

export async function getArchive() {
  return client.fetch(
    groq`*[_type == "archive"]{
              _id,
              archiveImage,
              archiveImage {alt, "image": asset->url, videoUrl, "palette": asset->metadata.palette},
            }`
  );
}

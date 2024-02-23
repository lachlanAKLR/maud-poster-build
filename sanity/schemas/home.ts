import { defineType } from "sanity";
import { defineField } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      title: "Video URL",
      name: "videoUrl",
      type: "url",
    }),
    defineField({
      title: "Video Fallback",
      name: "videoPoster",
      type: "image",
    }),
  ],
});

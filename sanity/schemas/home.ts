import { defineType } from "sanity";
import { defineField } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      title: "Video URL",
      name: "videoUrl",
      type: "url",
    }),
    defineField({
      name: "carousel",
      title: "Featured Projects",
      type: "array",
      of: [{ type: "reference", to: { type: "project" } }],
    }),
  ],
});

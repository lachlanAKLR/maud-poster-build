import { defineType } from "sanity";
import { defineField } from "sanity";

export default defineType({
  name: "carouselItem",
  title: "Carousel Item",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description",
          type: "string",
        }),
      ],
    }),
    defineField({
      title: "Video URL",
      name: "videoUrl",
      type: "url",
    }),
  ],
});

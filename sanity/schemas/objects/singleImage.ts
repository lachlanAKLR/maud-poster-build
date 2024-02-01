import { defineType, defineField } from "sanity";

export default defineType({
  name: "singleImage",
  title: "Single Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "image.alt",
    },
  },
});

import { defineType, defineField } from "sanity";

export default defineType({
  name: "portraitImage",
  title: "Portrait Image",
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

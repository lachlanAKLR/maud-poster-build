import { defineType, defineField } from "sanity";

export default defineType({
  name: "twoUpImage",
  title: "Two Images",
  type: "object",
  fields: [
    defineField({
      name: "leftImage",
      title: "Left Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "rightImage",
      title: "Right Image",
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
      media: "leftImage",
      title: "leftImage.alt",
    },
  },
});

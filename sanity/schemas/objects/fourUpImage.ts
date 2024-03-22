import { defineType, defineField } from "sanity";

export default defineType({
  name: "fourUpImage",
  title: "Four Square",
  type: "object",
  fields: [
    defineField({
      name: "topLeftImage",
      title: "Top Left Image",
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
      name: "topRightImage",
      title: "Top Right Image",
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
      name: "bottomLeftImage",
      title: "Bottom Left Image",
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
      name: "bottomRightImage",
      title: "Bottom Right Image",
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
      title: "topLeftImage.alt",
      media: "topLeftImage",
    },
  },
});

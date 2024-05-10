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
        defineField({
          title: "Video URL",
          name: "videoUrl",
          type: "url",
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
        defineField({
          title: "Video URL",
          name: "videoUrl",
          type: "url",
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
        defineField({
          title: "Video URL",
          name: "videoUrl",
          type: "url",
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
        defineField({
          title: "Video URL",
          name: "videoUrl",
          type: "url",
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

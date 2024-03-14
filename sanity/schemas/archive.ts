import { defineField, defineType } from "sanity";
import { MdArchive } from "react-icons/md";

export default defineType({
  name: "archive",
  title: "Archives",
  type: "document",
  icon: MdArchive,
  fields: [
    defineField({
      name: "archiveImage",
      title: "Archive Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description",
          type: "string",
        }),
        defineField({
          title: "Video URL",
          name: "videoUrl",
          type: "url",
        }),
        defineField({
          name: "ratio",
          title: "Video Ratio",
          type: "string",
          initialValue: "square",
          options: {
            list: [
              { title: "Square", value: "square" },
              { title: "Landscape", value: "landscape" },
              { title: "Portrait", value: "portrait" },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: "archiveImage",
      title: "archiveImage.alt",
    },
  },
});

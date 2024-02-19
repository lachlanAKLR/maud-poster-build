import { defineField, defineType } from "sanity";
import { MdArchive } from "react-icons/md";

export default defineType({
  name: "archive",
  title: "Archive",
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
          name: "ratio",
          title: "Image Ratio",
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
        defineField({
          title: "Video URL",
          name: "videoUrl",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      media: "archiveImage",
      title: "archiveImage.alt",
      subtitle: "archiveImage.ratio",
    },
  },
});

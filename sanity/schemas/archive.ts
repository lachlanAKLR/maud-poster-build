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
    },
  },
});

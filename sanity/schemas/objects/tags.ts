import { defineField, defineType } from "sanity";
import { MdBookmarks } from "react-icons/md";

export default defineType({
  name: "tags",
  title: "Tags",
  type: "document",
  icon: MdBookmarks,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        icon: MdBookmarks,
      };
    },
  },
});

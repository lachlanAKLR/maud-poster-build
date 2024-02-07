import { defineField, defineType } from "sanity";
import { MdBookmarks } from "react-icons/md";

export default defineType({
  name: "tags",
  title: "Tag",
  type: "document",
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

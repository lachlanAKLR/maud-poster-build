import { defineField, defineType } from "sanity";
import { MdSmartDisplay } from "react-icons/md";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      title: "Video URL",
      name: "videoUrl",
      type: "url",
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
        icon: MdSmartDisplay,
      };
    },
  },
});

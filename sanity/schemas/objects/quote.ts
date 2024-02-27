import { MdFormatQuote } from "react-icons/md";

import { defineType, defineField } from "sanity";

export default defineType({
  name: "quote",
  title: "Project Text",
  type: "object",
  fields: [
    defineField({
      name: "text",
      type: "array",
      title: "Project Text",
      of: [
        {
          type: "block",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare: ({ title }) => ({
      title: "Project Text",
      media: MdFormatQuote,
    }),
  },
});

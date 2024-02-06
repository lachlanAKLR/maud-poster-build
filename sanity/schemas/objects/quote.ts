import { MdFormatQuote } from "react-icons/md";

import { defineType, defineField } from "sanity";

export default defineType({
  name: "quote",
  title: "Quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      type: "array",
      title: "Quote",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      title: "Author",
      name: "author",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare: ({ title }) => ({
      title: "Quote",
      media: MdFormatQuote,
    }),
  },
});

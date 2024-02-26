import { defineType } from "sanity";
import { defineField } from "sanity";

export default defineType({
  name: "archivePage",
  title: "Archive Page",
  type: "document",
  fields: [
    defineField({
      name: "archiveTitle",
      type: "array",
      title: "Archive Title",
      of: [
        {
          type: "image",
        },
      ],
    }),
  ],
});

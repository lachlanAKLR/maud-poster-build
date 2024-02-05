import { defineType } from "sanity";

export default defineType({
  name: "info",
  title: "Info Page",
  type: "document",
  fields: [
    {
      name: "infoText",
      type: "array",
      title: "Info Text",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
  ],
});

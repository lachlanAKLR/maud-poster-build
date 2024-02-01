import { defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "settingsText",
      type: "array",
      title: "settings Text",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "heroImage",
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

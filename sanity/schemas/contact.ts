import { defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "contactText",
      type: "array",
      title: "Contact Text",
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

import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings Page",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "string",
    }),
    defineField({
      name: "addressOne",
      type: "array",
      title: "Address One",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "addressTwo",
      type: "array",
      title: "Address Two",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Footer Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "metaImage",
      title: "Meta Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Meta Image Description",
          type: "string",
        }),
      ],
    }),
  ],
});

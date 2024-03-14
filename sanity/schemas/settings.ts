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
      name: "addressOneLink",
      title: "Address One Link",
      type: "string",
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
      name: "addressTwoLink",
      title: "Address Two Link",
      type: "string",
    }),
    defineField({
      name: "metaImage",
      title: "Meta Image [1200 x 630]",
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

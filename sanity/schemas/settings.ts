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
      name: "addressOneGroup",
      title: "Address One",
      type: "object",
      fields: [
        defineField({
          name: "addressOne",
          title: "Address",
          type: "string",
        }),
        defineField({
          name: "addressOneLink",
          title: "Link",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "addressTwoGroup",
      title: "Address Two",
      type: "object",
      fields: [
        defineField({
          name: "addressTwo",
          title: "Address",
          type: "string",
        }),
        defineField({
          name: "addressTwoLink",
          title: "Address Link",
          type: "string",
        }),
      ],
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

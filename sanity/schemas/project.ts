import { MdAddPhotoAlternate } from "react-icons/md";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: MdAddPhotoAlternate,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Image Description",
          type: "string",
        }),
        defineField({
          name: "ratio",
          title: "Image Ratio",
          type: "string",
          initialValue: "square",
          options: {
            list: [
              { title: "Square", value: "square" },
              { title: "Letterbox", value: "letterbox" },
              { title: "Portrait", value: "portrait" },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
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
      name: "projectText",
      type: "array",
      title: "Project Text",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "layouts",
      title: "Image Layouts",
      type: "array",
      of: [
        {
          type: "singleImage",
          title: "Single Image",
        },
        {
          type: "twoUpImage",
          title: "Two Images",
        },
      ],
    }),
  ],
});

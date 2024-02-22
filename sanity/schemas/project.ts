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
      name: "subtitle",
      title: "Subtitle",
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
              { title: "Landscape", value: "landscape" },
              { title: "Portrait", value: "portrait" },
            ],
          },
        }),
        defineField({
          title: "Video URL",
          name: "videoUrl",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      fields: [
        defineField({
          title: "Featured Portrait Image",
          name: "featuredPortrait",
          type: "image",
        }),
        defineField({
          name: "alt",
          title: "Image Description",
          type: "string",
        }),
        defineField({
          title: "Video URL",
          name: "videoUrl",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Project Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tags" } }],
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
      title: "Layout Builder",
      type: "array",
      of: [
        {
          type: "landscapeImage",
          title: "Landscape Image",
        },
        {
          type: "portraitImage",
          title: "Portrait Image",
        },
        {
          type: "twoUpImage",
          title: "Portrait Two Up",
        },
        {
          type: "quote",
          title: "Text Quote",
        },
        {
          type: "video",
          title: "Video",
        },
      ],
    }),
    defineField({
      name: "projectCredits",
      type: "array",
      title: "Project Credits",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      media: "thumbnailImage",
      title: "title",
      subtitle: "thumbnailImage.ratio",
    },
  },
});

import { MdOutlineBrandingWatermark } from "react-icons/md";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: MdOutlineBrandingWatermark,
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
        source: "projectTitle",
        maxLength: 96,
      },
    }),
    defineField({
      name: "projectText",
      type: "array",
      title: "Contact Text",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "projectImage",
      title: "Project Hero Image",
      type: "image",
    }),
    defineField({
      title: "Project Hero Image Alt Tag [SEO]",
      name: "heroImageTag",
      type: "string",
      validation: (Rule) =>
        Rule.min(0).max(100).warning("Maximum of 100 characters"),
    }),
  ],
});

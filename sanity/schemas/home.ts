import { defineType } from "sanity";
import { defineField } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "carouselItems",
      title: "Carousel",
      type: "array",
      of: [
        {
          type: "carouselItem",
          title: "Carousel Item",
        },
      ],
    }),
  ],
});

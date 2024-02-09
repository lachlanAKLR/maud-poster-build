import { getCarouselItems } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";

export default async function Page() {
  const content: ProfileType[] = await getCarouselItems();

  // Assuming content[0].carousel exists and is an array
  if (content.length > 0 && content[0].carousel) {
    // Store the JSX elements in a variable
    const carouselJSX = content[0].carousel.map((item) => {
      return <div key={item._id}>{item.title}</div>;
    });

    // Return the JSX from the component function
    return <div>{carouselJSX}</div>;
  }

  // Return null or some fallback JSX if there's no content
  return null;
}

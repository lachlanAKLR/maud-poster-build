import TitleAnimation from "./components/TitleAnimation";
import { ProfileType } from "@/types";
import { getHome } from "@/sanity/lib/queries";
import SubTitle from "./components/SubTitle";
import { getCarouselItems } from "@/sanity/lib/queries";
import SlideCarousel from "./components/SlideCarousel";
import SlideCarouselItem from "./components/SlideCarouselItem";
import Carousel from "./components/Carousel";
import CustomCursor from "./components/Cursor";

export default async function Page() {
  const content: ProfileType[] = await getHome();
  const carouselContent: ProfileType[] = await getCarouselItems();

  return (
    <div className="bg-maud-black">
      <TitleAnimation title="MAUD" intervalMs={300} />
      <SubTitle content={content} />
      <CustomCursor />
      <Carousel />

      {/* <SlideCarousel>
        {carouselContent.length > 0 &&
          carouselContent[0].carousel.map((item, index) => (
            <SlideCarouselItem
              key={item._id}
              @ts-ignore
              item={item}
              index={index}
              indexLength={content[0].carouselContent.length - 1}
            />
          ))}
      </SlideCarousel> */}
    </div>
  );
}

import TitleAnimation from "./components/UI/TitleAnimation";
import { ProfileType } from "@/types";
import { getHome } from "@/sanity/lib/queries";
import SubTitle from "./components/UI/SubTitle";
import { getCarouselItems } from "@/sanity/lib/queries";
import SlideCarousel from "./components/UI/SlideCarousel";
import SlideCarouselItem from "./components/UI/SlideCarouselItem";
import Carousel from "./components/UI/Carousel";
import CustomCursor from "./components/UI/Cursor";
import { getSettings } from "@/sanity/lib/queries";

export default async function Page() {
  const content: ProfileType[] = await getHome();
  const carouselContent: ProfileType[] = await getCarouselItems();
  const settings: ProfileType[] = await getSettings();

  return (
    <div>
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

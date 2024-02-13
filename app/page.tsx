import Cursor from "./components/Cursor";
import Carousel from "./components/Carousel";
import TitleAnimation from "./components/TitleAnimation";
import { ProfileType } from "@/types";
import { getHome } from "@/sanity/lib/queries";
import SubTitle from "./components/SubTitle";

export default async function Page() {
  const content: ProfileType[] = await getHome();

  return (
    <div className="bg-maud-black">
      <TitleAnimation title="MAUD" intervalMs={300} />
      <SubTitle content={content} />
      <Cursor />
      <Carousel />
    </div>
  );
}

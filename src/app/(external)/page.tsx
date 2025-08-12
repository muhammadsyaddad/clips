import { CardGrid } from "@/components/section/card-grid";
import { HeroScroll } from "@/components/section/hero-scroll";
import { ClipsNavigation } from "@/components/section/clip-navigation";

const MarketingPage = () => {
  return (
    <div className="h-full w-full">
      <HeroScroll />
      <ClipsNavigation />
      <CardGrid />
    </div>
  );
};

export default MarketingPage;

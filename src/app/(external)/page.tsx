import { CardGrid } from "@/components/section/card-grid";
import { ClipsNavigation } from "@/components/section/clip-navigation";
import { HeroScroll } from "@/components/section/hero-scroll";

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

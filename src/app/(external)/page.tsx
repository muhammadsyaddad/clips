import { CardGrid } from "@/components/section/card-grid";
import { NavbarResize } from "@/components/section/navbar-resize";

const MarketingPage = () => {
  return (
    <div className="bg-background text-foreground w-full">
      <NavbarResize />
      <main>
        <CardGrid />
      </main>
    </div>
  );
};

export default MarketingPage;

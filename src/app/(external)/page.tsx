import { MarketingNavbar } from "@/components/marketing-navbar";
import { HeroSection } from "@/components/section/hero-section";

// Navbar dengan animasi slide-down

// HeroSection dengan animasi berurutan

const MarketingPage = () => {
  return (
    <>
      <MarketingNavbar />
      <main>
        <HeroSection />
      </main>
    </>
  );
};

export default MarketingPage;

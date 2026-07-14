import { AboutSection } from "./components/sections/AboutSection";
import { Footer } from "./components/sections/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { IndustriesSection } from "./components/sections/IndustriesSection";
import { InsightsSection } from "./components/sections/InsightsSection";
import { PlatformSection } from "./components/sections/PlatformSection";
import { TrustSection } from "./components/sections/TrustSection";
import { Header } from "./components/site/Header";

export default function Home() {
  return (
    <main className="site-main">
      <Header />
      <HeroSection />
      <PlatformSection />
      <IndustriesSection />
      <TrustSection />
      <AboutSection />
      <InsightsSection />
      <Footer />
    </main>
  );
}

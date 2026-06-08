import { HeroSection } from "@/components/hero-section";
import { WeeklyDesignLens } from "@/components/weekly-design-lens";
import { LogoStrip } from "@/components/logo-strip";
import { FeaturedWorkSection } from "@/components/featured-work-section";
import { HowIWorkSection } from "@/components/how-i-work-section";
import { ContactCta } from "@/components/contact-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WeeklyDesignLens />
      <LogoStrip />
      <FeaturedWorkSection />
      <HowIWorkSection />
      <ContactCta />
    </>
  );
}

import React from "react";
import {
  getHome,
  getSite,
  getSolutions,
  getPartners,
  getCustomers,
  getForms,
} from "@/lib/content";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { Commitment } from "@/components/sections/Commitment";
import { Stats } from "@/components/sections/Stats";
import { SolutionsCarousel } from "@/components/sections/SolutionsCarousel";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ContactBand } from "@/components/sections/ContactBand";

export default function HomePage() {
  const home = getHome();
  const site = getSite();
  const solutions = getSolutions();
  const partners = getPartners();
  const customers = getCustomers();
  const forms = getForms();

  return (
    <div className="min-h-screen">
      {/* 1. Hero with WebGL Particle Network & Slider */}
      <HeroSlider
        slides={home.hero.slides}
        autoplayMs={home.hero.autoplayMs}
        pauseOnHover={home.hero.pauseOnHover}
      />

      {/* 2. Commitment Section */}
      <Commitment
        title={home.commitment.title}
        points={home.commitment.points}
      />

      {/* 3. Stats Counter Section */}
      {home.stats.enabled && (
        <Stats items={home.stats.items} note={home.stats.note} />
      )}

      {/* 4. Solutions Embla Carousel */}
      <SolutionsCarousel
        title={home.solutionsCarousel.title}
        items={solutions.items}
        excerptChars={home.solutionsCarousel.excerptChars}
        autoplayMs={home.solutionsCarousel.autoplayMs}
        loop={home.solutionsCarousel.loop}
      />

      {/* 5. Partners Infinite Marquee */}
      <LogoMarquee
        title={home.partners.title}
        items={partners.partners}
        reverse={false}
      />

      {/* 6. Customers Reverse Marquee */}
      <LogoMarquee
        title={home.customers.title}
        subtitle={home.customers.subtitle}
        items={customers}
        reverse={true}
      />

      {/* 7. Contact Band */}
      <ContactBand
        title={home.contactBand.title}
        formDef={forms.enquiry}
        site={site}
      />
    </div>
  );
}

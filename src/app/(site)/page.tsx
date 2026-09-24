import React from "react";
import { getHome, getSite } from "@/lib/content";
import { HeroSlider } from "@/components/hero/HeroSlider";

export default function HomePage() {
  const home = getHome();
  const site = getSite();

  return (
    <div className="min-h-screen">
      <HeroSlider
        slides={home.hero.slides}
        autoplayMs={home.hero.autoplayMs}
        pauseOnHover={home.hero.pauseOnHover}
      />
    </div>
  );
}

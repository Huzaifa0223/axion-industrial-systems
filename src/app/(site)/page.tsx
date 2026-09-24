import React from "react";
import { getHome, getSite } from "@/lib/content";

export default function HomePage() {
  const home = getHome();
  const site = getSite();

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-text">
          {site.brand.name} — {site.brand.tagline}
        </h1>
        <p className="mt-4 text-text-muted max-w-2xl text-lg">
          {site.seo.description}
        </p>
      </div>
    </div>
  );
}

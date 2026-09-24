import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { PageTransition } from "@/components/motion/PageTransition";
import { getSite, getNavigation } from "@/lib/content";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = getSite();
  const navigation = getNavigation();

  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <div className="flex flex-col min-h-screen">
        <Header site={site} navigation={navigation} />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer site={site} />
      </div>
    </SmoothScroll>
  );
}

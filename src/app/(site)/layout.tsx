import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSite, getNavigation } from "@/lib/content";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = getSite();
  const navigation = getNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header site={site} navigation={navigation} />
      <main className="flex-grow">{children}</main>
      <Footer site={site} />
    </div>
  );
}

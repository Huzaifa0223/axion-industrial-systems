import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAbout } from "@/lib/content";
import { ArrowRight, Calendar } from "lucide-react";

export default function AboutPage() {
  const { about } = getAbout();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-accent">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text tracking-tight">
            {about.title}
          </h1>
          <p className="mt-4 text-lg text-accent font-medium leading-relaxed">
            {about.intro}
          </p>
        </div>

        {/* Narrative & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 text-text-muted leading-relaxed font-body">
            {about.body.map((para, i) => (
              <p key={i} className="text-base sm:text-lg">
                {para}
              </p>
            ))}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/about/firmware"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border text-sm font-semibold text-text hover:border-accent hover:text-accent transition-colors"
              >
                <span>Read Our Firmware Principles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about/structure"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border text-sm font-semibold text-text hover:border-accent hover:text-accent transition-colors"
              >
                <span>Explore Business Structure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-96 sm:h-[450px] rounded-3xl overflow-hidden border border-border shadow-2xl">
            <Image
              src={about.image}
              alt="Axion Engineering Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-card text-xs text-text-muted">
              Concept to Handover • Dedicated Lifecycle Maintenance
            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="border-t border-border/60 pt-20">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Our Journey
            </span>
            <h2 className="text-3xl font-display font-bold text-text mt-2">
              Milestones of Growth & Innovation
            </h2>
          </div>

          <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-32 space-y-12 pb-8">
            {about.timeline.map((item, idx) => (
              <div key={item.year} className="relative pl-8 sm:pl-12 group">
                {/* Milestone Node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all shadow-md" />

                <div className="sm:absolute sm:-left-32 sm:top-1 font-mono font-bold text-lg text-accent">
                  {item.year}
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-border/80 group-hover:border-accent/40 group-hover:shadow-lg transition-all duration-200">
                  <h3 className="font-display font-bold text-lg text-text">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-text-muted leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

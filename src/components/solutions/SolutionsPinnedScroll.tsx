"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SolutionItem } from "@/lib/schemas/solutions";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SolutionsPinnedScrollProps {
  items: SolutionItem[];
}

export function SolutionsPinnedScroll({ items }: SolutionsPinnedScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined" || window.innerWidth < 1024) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-bg">
      {/* Desktop Pinned Horizontal Scroll */}
      <div className="hidden lg:flex h-screen items-center px-12 overflow-hidden">
        {/* Sticky Left Title */}
        <div className="w-80 flex-shrink-0 pr-8 z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Capabilities Architecture
          </span>
          <h1 className="text-4xl font-display font-bold text-text mt-3 tracking-tight">
            Integrated Solutions
          </h1>
          <p className="mt-4 text-sm text-text-muted leading-relaxed">
            Scroll horizontally to navigate our full spectrum of industrial automation, digital IIoT, machine vision, and support programs.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs font-mono text-accent">
            <span>Scroll Down to Pan</span>
            <span>→</span>
          </div>
        </div>

        {/* Horizontal Track */}
        <div ref={trackRef} className="flex gap-8 pl-8 flex-nowrap will-change-transform">
          {items.map((solution) => (
            <div key={solution.slug} className="w-[380px] flex-shrink-0 h-[520px]">
              <SolutionCard solution={solution} excerptChars={180} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Vertical Stack */}
      <div className="lg:hidden px-4 sm:px-6 py-24 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Capabilities Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-text mt-2">
            Integrated Solutions
          </h1>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            Our full spectrum of industrial automation, digital IIoT, machine vision, and site support programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((solution) => (
            <div key={solution.slug} className="h-full">
              <SolutionCard solution={solution} excerptChars={160} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

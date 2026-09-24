"use client";

import React from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LogoItem {
  name: string;
  logo: string;
  url?: string;
}

interface LogoMarqueeProps {
  title: string;
  subtitle?: string;
  items: LogoItem[];
  reverse?: boolean;
}

export function LogoMarquee({
  title,
  subtitle,
  items,
  reverse = false,
}: LogoMarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items 4 times to ensure seamless infinite looping without gaps
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="py-16 bg-surface/30 border-t border-border/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h3 className="text-xl sm:text-2xl font-display font-bold text-text">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Edge Fade Masks */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        {shouldReduceMotion ? (
          // Reduced motion: static grid/flex
          <div className="flex flex-wrap justify-center items-center gap-8 px-8 py-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="w-36 h-14 flex items-center justify-center p-2 rounded-xl bg-surface border border-border"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={140}
                  height={50}
                  className="max-h-10 w-auto object-contain opacity-80"
                />
              </div>
            ))}
          </div>
        ) : (
          // Seamless CSS Marquee
          <div
            className={
              reverse ? "animate-marquee-reverse" : "animate-marquee"
            }
          >
            {repeatedItems.map((item, idx) => (
              <div
                key={idx}
                className="group flex-shrink-0 mx-4 w-40 sm:w-48 h-16 sm:h-20 rounded-xl bg-surface border border-border/60 hover:border-accent/40 flex items-center justify-center p-3 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative w-full h-full flex items-center justify-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 opacity-70 group-hover:opacity-100">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={140}
                    height={50}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

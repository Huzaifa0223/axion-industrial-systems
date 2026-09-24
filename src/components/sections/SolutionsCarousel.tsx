"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { SolutionItem } from "@/lib/schemas/solutions";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SolutionsCarouselProps {
  title: string;
  items: SolutionItem[];
  excerptChars?: number;
  autoplayMs?: number;
  loop?: boolean;
}

export function SolutionsCarousel({
  title,
  items,
  excerptChars = 180,
  autoplayMs = 4000,
  loop = true,
}: SolutionsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: autoplayMs, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              Engineered Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text mt-2">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/solutions"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-accent transition-colors mr-4"
            >
              <span>View All Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="p-3 rounded-full bg-surface border border-border text-text hover:text-accent hover:border-accent/40 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="p-3 rounded-full bg-surface border border-border text-text hover:text-accent hover:border-accent/40 transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6 py-4">
            {items.map((solution) => (
              <div
                key={solution.slug}
                className="flex-shrink-0 pl-6 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <SolutionCard solution={solution} excerptChars={excerptChars} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            <span>View All Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

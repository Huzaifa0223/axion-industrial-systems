"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { HeroSlide } from "@/lib/schemas/home";
import { SlideText } from "./SlideText";
import { HeroPagination } from "./HeroPagination";
import { HeroCanvasWrapper } from "./HeroCanvasWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplayMs?: number;
  pauseOnHover?: boolean;
}

export function HeroSlider({
  slides,
  autoplayMs = 6500,
  pauseOnHover = true,
}: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const effectivelyPaused = isPaused || (pauseOnHover && isHovered) || isFocused;

  // Autoplay ticker
  useEffect(() => {
    if (effectivelyPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const progressStep = (stepMs / autoplayMs) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + progressStep;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [effectivelyPaused, autoplayMs, nextSlide]);

  // Arrow key keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const currentSlide = slides[activeIndex];

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlighted Automation Capabilities"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative w-full min-h-[92vh] flex items-center bg-[#070814] overflow-hidden focus:outline-none"
    >
      {/* Background Media with Dark Industrial Scrim */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isCurrent ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={slide.media.src}
                alt={slide.media.alt}
                fill
                priority={idx === 0}
                className="object-cover object-center filter brightness-[0.45] contrast-[1.1]"
              />
            </div>
          );
        })}

        {/* Ambient Dark Gradient Scrim ensuring >= 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070814]/95 via-[#070814]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070814] via-transparent to-[#070814]/50 z-10" />
      </div>

      {/* R3F WebGL Particle Network with Reduced Motion Guard */}
      <HeroCanvasWrapper />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-28 flex items-center justify-between">
        {/* Text Area */}
        <div className="w-full lg:w-3/4">
          <SlideText slide={currentSlide} isActive={true} />
        </div>

        {/* Right Vertical Pagination */}
        <div className="hidden lg:block">
          <HeroPagination
            slidesCount={slides.length}
            activeIndex={activeIndex}
            progress={progress}
            onSelect={goToSlide}
            isPaused={effectivelyPaused}
            onTogglePause={() => setIsPaused((prev) => !prev)}
          />
        </div>
      </div>

      {/* Manual Mobile/Tablet Arrows */}
      <div className="absolute bottom-8 right-6 lg:hidden z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="p-2.5 rounded-full bg-surface/70 backdrop-blur-md border border-border text-white hover:text-accent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="p-2.5 rounded-full bg-surface/70 backdrop-blur-md border border-border text-white hover:text-accent"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll Cue (animations.json: animated mouse icon, dot bounces 1.6s loop) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none opacity-80">
        <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
        </div>
      </div>
    </section>
  );
}

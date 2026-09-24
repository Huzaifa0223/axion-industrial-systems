"use client";

import React from "react";
import { Play, Pause } from "lucide-react";

interface HeroPaginationProps {
  slidesCount: number;
  activeIndex: number;
  progress: number; // 0 to 100
  onSelect: (index: number) => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export function HeroPagination({
  slidesCount,
  activeIndex,
  progress,
  onSelect,
  isPaused,
  onTogglePause,
}: HeroPaginationProps) {
  return (
    <div
      className="hidden md:flex flex-col items-center gap-4 z-20"
      role="group"
      aria-label="Carousel slide pagination"
    >
      {/* Play/Pause Button */}
      <button
        type="button"
        onClick={onTogglePause}
        aria-label={isPaused ? "Play slide rotation" : "Pause slide rotation"}
        className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white flex items-center justify-center transition-all mb-2 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {isPaused ? (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        ) : (
          <Pause className="w-3.5 h-3.5 fill-current" />
        )}
      </button>

      {/* Vertical Progress Indicators */}
      {Array.from({ length: slidesCount }).map((_, index) => {
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3 py-1 focus-visible:outline-none"
          >
            {/* Slide Index Number */}
            <span
              className={`font-mono text-[11px] transition-colors ${
                isActive
                  ? "text-accent font-bold"
                  : "text-white/40 group-hover:text-white/70"
              }`}
            >
              0{index + 1}
            </span>

            {/* Vertical Bar Container */}
            <div className="w-1 h-10 rounded-full bg-white/20 overflow-hidden relative">
              <div
                className="absolute inset-x-0 top-0 bg-accent transition-all rounded-full"
                style={{
                  height: isActive
                    ? `${progress}%`
                    : isPast
                    ? "100%"
                    : "0%",
                  transitionDuration: isActive ? "50ms" : "300ms",
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

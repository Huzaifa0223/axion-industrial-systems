"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { HeroSlide } from "@/lib/schemas/home";
import { Button } from "@/components/ui/Button";
import { easings } from "@/lib/motion";

interface SlideTextProps {
  slide: HeroSlide;
  isActive: boolean;
}

export function SlideText({ slide, isActive }: SlideTextProps) {
  if (!isActive) return null;

  const words = slide.title.split(" ");

  return (
    <div className="max-w-3xl space-y-6">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.35em" }}
        animate={{ opacity: 1, letterSpacing: "0.18em" }}
        transition={{ duration: 0.8, ease: easings.outQuart }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised/80 backdrop-blur-md border border-border/70 text-accent font-mono text-xs uppercase font-medium"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        {slide.eyebrow}
      </motion.div>

      {/* Split Text Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.12]">
        {words.map((word, i) => {
          const isAccent = word.toLowerCase().includes(slide.accentWord.toLowerCase());
          return (
            <span key={i} className="inline-block overflow-hidden mr-[0.28em] align-top">
              <motion.span
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.05,
                  ease: easings.outExpo,
                }}
                className={`inline-block ${
                  isAccent
                    ? "text-gradient-sweep font-extrabold"
                    : "text-white"
                }`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: easings.outQuart }}
        className="text-base sm:text-lg text-white/80 max-w-xl font-body leading-relaxed"
      >
        {slide.subtitle}
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: easings.outQuart }}
        className="pt-2 flex items-center gap-4"
      >
        <Button href={slide.cta.href} size="lg" variant="primary">
          {slide.cta.label}
        </Button>
      </motion.div>
    </div>
  );
}

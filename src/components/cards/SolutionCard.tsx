"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SolutionItem } from "@/lib/schemas/solutions";
import { Icon } from "@/components/ui/Icon";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SolutionCardProps {
  solution: SolutionItem;
  excerptChars?: number;
}

export function SolutionCard({ solution, excerptChars = 180 }: SolutionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPointerFine, setIsPointerFine] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !isPointerFine || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // max 8deg tilt
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const truncatedSummary =
    solution.summary.length > excerptChars
      ? `${solution.summary.slice(0, excerptChars)}...`
      : solution.summary;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          isPointerFine && !shouldReduceMotion
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : "none",
        transition: "transform 0.15s ease-out",
      }}
      className="group relative h-full flex flex-col rounded-2xl bg-surface border border-border overflow-hidden hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
    >
      {/* Top Image Banner */}
      <div className="relative w-full h-48 overflow-hidden bg-surface-raised">
        <Image
          src={solution.image}
          alt={solution.title}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

        {/* Icon Floating Badge */}
        <div className="absolute bottom-3 left-4 p-2.5 rounded-xl bg-surface-raised/90 backdrop-blur-md border border-border text-primary group-hover:text-accent group-hover:-translate-y-1 transition-all duration-200 shadow-md">
          <Icon name={solution.icon} className="w-5 h-5" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-display font-bold text-lg text-text group-hover:text-accent transition-colors line-clamp-1">
            {solution.title}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
            {truncatedSummary}
          </p>
        </div>

        {/* Features Chips */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {solution.features.slice(0, 3).map((feat, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-raised border border-border/60 text-text-muted"
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Link / CTA */}
        <div className="pt-4 border-t border-border/40 flex items-center justify-between">
          <Link
            href={`/solutions/${solution.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:text-accent transition-colors"
          >
            <span>Explore Solution</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[10px] font-mono uppercase text-text-muted/60">
            {solution.industries[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

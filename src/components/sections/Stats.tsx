"use client";

import React from "react";
import { motion } from "motion/react";
import { Counter } from "@/components/ui/Counter";
import { easings } from "@/lib/motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface StatsProps {
  items: StatItem[];
  note?: string;
}

export function Stats({ items, note }: StatsProps) {
  const isDemo = process.env.NEXT_PUBLIC_DEMO !== "false";

  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          {items.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center p-6 ${
                i !== 0 ? "pt-8 sm:pt-6" : ""
              }`}
            >
              {/* Animated Number */}
              <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-text tracking-tight flex items-baseline">
                <Counter value={stat.value} suffix={stat.suffix} duration={1.8} />
              </div>

              {/* Animated Growing Underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: easings.outExpo }}
                className="h-1 bg-gradient-to-r from-primary to-accent rounded-full my-3"
              />

              {/* Label */}
              <span className="text-xs sm:text-sm font-medium text-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Demo Data Note / Badge */}
        {isDemo && note && (
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-raised border border-border text-[11px] font-mono text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {note}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

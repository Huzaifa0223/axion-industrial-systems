"use client";

import React from "react";
import { motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { easings } from "@/lib/motion";

interface CommitmentPoint {
  icon: string;
  text: string;
}

interface CommitmentProps {
  title: string;
  points: CommitmentPoint[];
}

export function Commitment({ title, points }: CommitmentProps) {
  return (
    <section className="py-24 bg-surface/50 border-y border-border/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Our Core Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text mt-3">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {points.map((point, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: easings.outExpo,
                }}
                className="relative p-8 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row gap-6 items-start hover:border-accent/40 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Icon name={point.icon} className="w-7 h-7 text-accent" />
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-2">
                  <span className="text-xs font-mono uppercase text-accent font-semibold">
                    Principle 0{index + 1}
                  </span>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body">
                    {point.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

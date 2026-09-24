"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easings } from "@/lib/motion";

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (shouldReduceMotion) {
      setVisible(false);
      return;
    }

    const seen = sessionStorage.getItem("axion-preloader-seen");
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem("axion-preloader-seen", "true");

      // Strictly capped to max 1.4s per specification
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1300);

      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion]);

  if (!visible) return null;

  const brandLetters = "AXION".split("");

  return (
    <AnimatePresence>
      <motion.div
        role="progressbar"
        aria-label="Loading site resources"
        initial={{ opacity: 1, y: 0 }}
        exit={{
          y: "-100%",
          transition: { duration: 0.6, ease: easings.outExpo },
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070814] text-white overflow-hidden pointer-events-auto"
      >
        <div className="flex flex-col items-center gap-6">
          {/* SVG Logo Mark Stroke Draw-In */}
          <div className="relative w-20 h-20">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100"
                height="100"
                rx="20"
                fill="#0E1024"
                stroke="#23274A"
                strokeWidth="2"
              />
              <motion.path
                d="M50 18 L82 78 L66 78 L50 48 L34 78 L18 78 Z"
                stroke="#22D3FF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: easings.outQuart }}
              />
              <motion.circle
                cx="50"
                cy="35"
                r="7"
                fill="#22D3FF"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5, ease: easings.outExpo }}
              />
            </svg>
          </div>

          {/* Staggered Wordmark */}
          <div className="flex items-center gap-1 font-display font-bold text-2xl tracking-widest">
            {brandLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + idx * 0.05,
                  ease: easings.outQuart,
                }}
                className="text-white"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent"
          >
            Industrial Systems
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

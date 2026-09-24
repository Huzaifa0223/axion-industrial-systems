"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    setIsPointerFine(pointerFine);

    if (!pointerFine || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest("a, button, input, select, textarea, [role='button']");
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, shouldReduceMotion]);

  if (!isPointerFine || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small Center Dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.05 }}
      />

      {/* Trailing Outer Ring that grows over interactive elements */}
      <motion.div
        className="fixed rounded-full border border-accent/60 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          width: isHoveringInteractive ? 44 : 24,
          height: isHoveringInteractive ? 44 : 24,
          backgroundColor: isHoveringInteractive ? "rgba(0, 194, 255, 0.12)" : "transparent",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.1 }}
      />
    </div>
  );
}

"use client";

import React from "react";
import { motion, MotionConfig } from "motion/react";
import { pageTransitionVariants } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransitionVariants}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

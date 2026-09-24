"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ParticleFallback } from "./ParticleFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DynamicParticleNetwork = dynamic(
  () => import("./ParticleNetwork").then((mod) => mod.ParticleNetwork),
  {
    ssr: false,
    loading: () => <ParticleFallback />,
  }
);

export function HeroCanvasWrapper() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ParticleFallback />;
  }

  // Strict reduced motion check: never mount 3D canvas if prefers-reduced-motion is active
  if (shouldReduceMotion) {
    return <ParticleFallback />;
  }

  return (
    <>
      <ParticleFallback />
      <DynamicParticleNetwork />
    </>
  );
}

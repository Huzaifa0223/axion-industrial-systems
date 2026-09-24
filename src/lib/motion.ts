export const easings = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const durations = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
  hero: 1.4,
};

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easings.outQuart,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.3,
      ease: easings.inOut,
    },
  },
};

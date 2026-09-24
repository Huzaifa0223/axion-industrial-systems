import { z } from "zod";

export const animationsSchema = z.object({
  global: z.object({
    respectReducedMotion: z.boolean(),
    reducedMotionFallback: z.string(),
    smoothScroll: z.object({
      library: z.string(),
      duration: z.number(),
      easing: z.string(),
    }),
    easings: z.record(z.array(z.number())),
    durations: z.record(z.number()),
    pageTransition: z.object({
      type: z.string(),
      y: z.number(),
      duration: z.number(),
    }),
  }),
  preloader: z.object({
    enabled: z.boolean(),
    maxMs: z.number(),
    sequence: z.array(z.string()),
    showOncePerSession: z.boolean(),
  }),
  header: z.any().optional(),
  hero: z.any().optional(),
  sections: z.record(z.any()),
  micro: z.any().optional(),
  performanceBudget: z.any().optional(),
});

export type AnimationsConfig = z.infer<typeof animationsSchema>;

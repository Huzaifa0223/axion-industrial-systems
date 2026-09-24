import { z } from "zod";

export const themeSchema = z.object({
  reference: z.any().optional(),
  colors: z.object({
    light: z.object({
      bg: z.string(),
      surface: z.string(),
      surfaceRaised: z.string(),
      border: z.string(),
      text: z.string(),
      textMuted: z.string(),
      primary: z.string(),
      primaryHover: z.string(),
      accent: z.string(),
      accentGlow: z.string(),
      success: z.string(),
      danger: z.string(),
    }),
    dark: z.object({
      bg: z.string(),
      surface: z.string(),
      surfaceRaised: z.string(),
      border: z.string(),
      text: z.string(),
      textMuted: z.string(),
      primary: z.string(),
      primaryHover: z.string(),
      accent: z.string(),
      accentGlow: z.string(),
      success: z.string(),
      danger: z.string(),
    }),
    heroGradient: z.string(),
  }),
  typography: z.object({
    display: z.object({
      family: z.string(),
      weights: z.array(z.number()),
      source: z.string(),
    }),
    body: z.object({
      family: z.string(),
      weights: z.array(z.number()),
      source: z.string(),
    }),
    mono: z.object({
      family: z.string(),
      weights: z.array(z.number()),
      source: z.string(),
    }),
    scale: z.record(z.string()),
    lineHeight: z.record(z.number()),
    letterSpacing: z.record(z.string()),
  }),
  spacing: z.record(z.string()),
  radius: z.record(z.string()),
  shadow: z.record(z.string()),
  breakpoints: z.record(z.number()),
});

export type ThemeConfig = z.infer<typeof themeSchema>;

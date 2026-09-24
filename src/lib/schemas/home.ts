import { z } from "zod";

export const heroSlideSchema = z.object({
  id: z.string(),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  media: z.object({
    type: z.enum(["image", "video"]),
    src: z.string(),
    poster: z.string().optional(),
    alt: z.string(),
  }),
  accentWord: z.string(),
});

export const homeSchema = z.object({
  hero: z.object({
    variant: z.string(),
    autoplayMs: z.number(),
    pauseOnHover: z.boolean(),
    slides: z.array(heroSlideSchema),
  }),
  commitment: z.object({
    title: z.string(),
    points: z.array(
      z.object({
        icon: z.string(),
        text: z.string(),
      })
    ),
  }),
  stats: z.object({
    enabled: z.boolean(),
    items: z.array(
      z.object({
        value: z.number(),
        suffix: z.string(),
        label: z.string(),
      })
    ),
    note: z.string().optional(),
  }),
  solutionsCarousel: z.object({
    title: z.string(),
    source: z.string(),
    excerptChars: z.number(),
    loop: z.boolean(),
    autoplayMs: z.number(),
    slidesPerView: z.object({
      mobile: z.number(),
      tablet: z.number(),
      desktop: z.number(),
    }),
  }),
  partners: z.object({
    title: z.string(),
    source: z.string(),
    variant: z.string(),
  }),
  customers: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    source: z.string(),
    variant: z.string(),
  }),
  contactBand: z.object({
    title: z.string(),
    showMap: z.boolean(),
    formId: z.string(),
  }),
});

export type HomeConfig = z.infer<typeof homeSchema>;
export type HeroSlide = z.infer<typeof heroSlideSchema>;

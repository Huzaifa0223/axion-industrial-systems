import { z } from "zod";

export const siteSchema = z.object({
  $schema: z.string().optional(),
  brand: z.object({
    name: z.string(),
    legalName: z.string(),
    tagline: z.string(),
    logo: z.object({
      light: z.string(),
      dark: z.string(),
      mark: z.string(),
    }),
    favicon: z.string(),
  }),
  seo: z.object({
    titleTemplate: z.string(),
    defaultTitle: z.string(),
    description: z.string(),
    ogImage: z.string(),
    locale: z.string(),
    alternateLocales: z.array(z.string()).default([]),
  }),
  contact: z.object({
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    hours: z.string(),
    mapEmbed: z.string().nullable().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  social: z.array(
    z.object({
      platform: z.string(),
      url: z.string(),
    })
  ),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  footer: z.object({
    quickLinks: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ),
    newsletter: z.object({
      title: z.string(),
      subtitle: z.string(),
      formId: z.string(),
    }),
    copyright: z.string(),
  }),
});

export type SiteConfig = z.infer<typeof siteSchema>;

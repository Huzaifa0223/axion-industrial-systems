import { z } from "zod";

export const navItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  type: z.enum(["dropdown", "mega"]).optional(),
  source: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  items: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
      })
    )
    .optional(),
});

export const navigationSchema = z.object({
  primary: z.array(navItemSchema),
  cta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.string().optional(),
  }),
});

export type NavigationConfig = z.infer<typeof navigationSchema>;
export type NavItem = z.infer<typeof navItemSchema>;

import { z } from "zod";

export const aboutSchema = z.object({
  about: z.object({
    title: z.string(),
    intro: z.string(),
    body: z.array(z.string()),
    image: z.string(),
    timeline: z.array(
      z.object({
        year: z.number(),
        title: z.string(),
        text: z.string(),
      })
    ),
  }),
  firmware: z.object({
    title: z.string(),
    subtitle: z.string(),
    values: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        text: z.string(),
      })
    ),
  }),
  structure: z.object({
    title: z.string(),
    divisions: z.array(
      z.object({
        name: z.string(),
        text: z.string(),
      })
    ),
  }),
});

export type AboutConfig = z.infer<typeof aboutSchema>;

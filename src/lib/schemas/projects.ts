import { z } from "zod";

export const sectorSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  image: z.string(),
});

export const projectItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  sector: z.string(),
  client: z.string(),
  year: z.number(),
  location: z.string(),
  cover: z.string(),
  gallery: z.array(z.string()).default([]),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(
    z.object({
      metric: z.string(),
      value: z.string(),
    })
  ),
  solutions: z.array(z.string()),
});

export const projectsSchema = z.object({
  sectors: z.array(sectorSchema),
  items: z.array(projectItemSchema),
  note: z.string().optional(),
});

export type ProjectsConfig = z.infer<typeof projectsSchema>;
export type Sector = z.infer<typeof sectorSchema>;
export type ProjectItem = z.infer<typeof projectItemSchema>;

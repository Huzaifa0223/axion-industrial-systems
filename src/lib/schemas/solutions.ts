import { z } from "zod";

export const solutionItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  icon: z.string(),
  image: z.string(),
  summary: z.string(),
  body: z.array(z.string()),
  features: z.array(z.string()),
  industries: z.array(z.string()),
});

export const solutionsSchema = z.object({
  items: z.array(solutionItemSchema),
});

export type SolutionsConfig = z.infer<typeof solutionsSchema>;
export type SolutionItem = z.infer<typeof solutionItemSchema>;

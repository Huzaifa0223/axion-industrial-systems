import { z } from "zod";

export const productItemSchema = z.object({
  name: z.string(),
  specs: z.array(z.string()),
  datasheet: z.string().nullable().optional(),
});

export const productCategorySchema = z.object({
  slug: z.string(),
  title: z.string(),
  icon: z.string(),
  image: z.string(),
  summary: z.string(),
  items: z.array(productItemSchema),
});

export const productsSchema = z.object({
  categories: z.array(productCategorySchema),
});

export type ProductsConfig = z.infer<typeof productsSchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type ProductItem = z.infer<typeof productItemSchema>;

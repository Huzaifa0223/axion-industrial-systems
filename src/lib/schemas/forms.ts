import { z } from "zod";

export const formFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "tel", "select", "textarea", "checkbox", "file"]),
  required: z.boolean(),
  maxLength: z.number().optional(),
  minLength: z.number().optional(),
  optionsFrom: z.string().optional(),
  accept: z.string().optional(),
  maxSizeMb: z.number().optional(),
  options: z.array(z.string()).optional(),
});

export const formDefSchema = z.object({
  title: z.string().optional(),
  submitLabel: z.string(),
  successMessage: z.string(),
  endpoint: z.string(),
  fields: z.array(formFieldSchema),
  spamProtection: z
    .object({
      honeypotField: z.string().optional(),
      rateLimitPerIpPerHour: z.number().optional(),
    })
    .optional(),
});

export const formsSchema = z.record(formDefSchema);

export type FormField = z.infer<typeof formFieldSchema>;
export type FormDef = z.infer<typeof formDefSchema>;
export type FormsConfig = Record<string, FormDef>;

import { z } from "zod";

export const partnerItemSchema = z.object({
  name: z.string(),
  logo: z.string(),
  url: z.string().optional(),
});

export const customerItemSchema = z.object({
  name: z.string(),
  logo: z.string(),
  url: z.string().optional(),
});

export const partnersSchema = z.object({
  note: z.string().optional(),
  partners: z.array(partnerItemSchema),
  customers: z.array(customerItemSchema).optional(),
});

export const customersSchema = z.object({
  customers: z.array(customerItemSchema),
});

export type PartnersConfig = z.infer<typeof partnersSchema>;
export type PartnerItem = z.infer<typeof partnerItemSchema>;
export type CustomerItem = z.infer<typeof customerItemSchema>;

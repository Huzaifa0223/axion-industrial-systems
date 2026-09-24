import { z } from "zod";

export const careerBenefitSchema = z.object({
  icon: z.string(),
  title: z.string(),
  text: z.string(),
});

export const careerOpeningSchema = z.object({
  id: z.string(),
  title: z.string(),
  department: z.string(),
  location: z.string(),
  type: z.string(),
  experience: z.string(),
  summary: z.string(),
  requirements: z.array(z.string()),
});

export const careersSchema = z.object({
  title: z.string(),
  intro: z.string(),
  benefits: z.array(careerBenefitSchema),
  openings: z.array(careerOpeningSchema),
  applyFormId: z.string(),
});

export type CareersConfig = z.infer<typeof careersSchema>;
export type CareerOpening = z.infer<typeof careerOpeningSchema>;

import { FormDef } from "./schemas/forms";

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitFormMock(
  formDef: FormDef,
  formData: Record<string, any>
): Promise<FormSubmissionResult> {
  // Check honeypot
  const honeypot = formDef.spamProtection?.honeypotField || "website";
  if (formData[honeypot]) {
    return {
      success: true,
      message: formDef.successMessage,
    };
  }

  // Simulated network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Validate required fields
  const missingFields: Record<string, string> = {};
  for (const field of formDef.fields) {
    if (field.required && !formData[field.name]) {
      missingFields[field.name] = `${field.label} is required`;
    }
  }

  if (Object.keys(missingFields).length > 0) {
    return {
      success: false,
      message: "Please fill in all required fields.",
      errors: missingFields,
    };
  }

  return {
    success: true,
    message: formDef.successMessage,
  };
}

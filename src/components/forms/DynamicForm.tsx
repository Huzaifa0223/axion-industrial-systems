"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormDef, FormField } from "@/lib/schemas/forms";
import { CheckCircle2, Loader2, Send } from "lucide-react";

interface DynamicFormProps {
  formDef: FormDef;
  onSuccess?: () => void;
  className?: string;
}

export function DynamicForm({ formDef, onSuccess, className = "" }: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const honeypotName = formDef.spamProtection?.honeypotField || "website";

  const onSubmit = async (data: Record<string, any>) => {
    // Honeypot check: if filled, quietly drop as spam
    if (data[honeypotName]) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const targetEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || formDef.endpoint;

    try {
      if (targetEndpoint.startsWith("/api/")) {
        // Mock submission resolving after 800ms per brief spec
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsSuccess(true);
        reset();
        if (onSuccess) onSuccess();
      } else {
        const response = await fetch(targetEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to submit form.");
        setIsSuccess(true);
        reset();
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 rounded-2xl bg-surface border border-success/30 text-center space-y-3 animate-in fade-in duration-300">
        <CheckCircle2 className="w-12 h-12 text-success mx-auto" />
        <h4 className="text-xl font-display font-bold text-text">Thank You</h4>
        <p className="text-sm text-text-muted">{formDef.successMessage}</p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="text-xs font-semibold text-accent hover:underline pt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
      noValidate
    >
      {/* Honeypot field (hidden from view) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register(honeypotName)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formDef.fields.map((field) => {
          const isFullWidth =
            field.type === "textarea" ||
            field.type === "checkbox" ||
            field.name === "interest" ||
            field.name === "position";

          const error = errors[field.name];

          return (
            <div
              key={field.name}
              className={`space-y-1.5 ${isFullWidth ? "sm:col-span-2" : ""}`}
            >
              <label
                htmlFor={field.name}
                className="block text-xs font-semibold uppercase tracking-wider text-text/90"
              >
                {field.label}
                {field.required && <span className="text-accent ml-1">*</span>}
              </label>

              {/* Render field based on type */}
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  rows={4}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    error ? "border-danger ring-1 ring-danger" : "border-border"
                  }`}
                  {...register(field.name, {
                    required: field.required ? `${field.label} is required` : false,
                    minLength: field.minLength
                      ? { value: field.minLength, message: `Minimum ${field.minLength} characters` }
                      : undefined,
                    maxLength: field.maxLength
                      ? { value: field.maxLength, message: `Maximum ${field.maxLength} characters` }
                      : undefined,
                  })}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    error ? "border-danger ring-1 ring-danger" : "border-border"
                  }`}
                  {...register(field.name, {
                    required: field.required ? `Please select an option` : false,
                  })}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <div className="flex items-start gap-3 pt-2">
                  <input
                    id={field.name}
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-accent"
                    {...register(field.name, {
                      required: field.required ? "You must agree before submitting" : false,
                    })}
                  />
                  <label htmlFor={field.name} className="text-xs text-text-muted leading-tight">
                    {field.label}
                  </label>
                </div>
              ) : field.type === "file" ? (
                <input
                  id={field.name}
                  type="file"
                  accept={field.accept}
                  className="w-full text-xs text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-surface-raised file:text-text hover:file:bg-border"
                  {...register(field.name, {
                    required: field.required ? `${field.label} is required` : false,
                  })}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    error ? "border-danger ring-1 ring-danger" : "border-border"
                  }`}
                  {...register(field.name, {
                    required: field.required ? `${field.label} is required` : false,
                    maxLength: field.maxLength
                      ? { value: field.maxLength, message: `Maximum ${field.maxLength} characters` }
                      : undefined,
                  })}
                />
              )}

              {/* Field validation error message */}
              {error && (
                <p className="text-xs text-danger font-medium mt-1">
                  {error.message as string}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-xs text-danger">
          {errorMessage}
        </div>
      )}

      {/* Submit Button morphing to spinner */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-accent" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>{formDef.submitLabel}</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

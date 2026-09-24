import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DynamicForm } from "../components/forms/DynamicForm";
import { getForms } from "../lib/content";

describe("DynamicForm Component", () => {
  const forms = getForms();
  const enquiryForm = forms.enquiry;

  it("renders all required fields according to enquiry form definition", () => {
    render(<DynamicForm formDef={enquiryForm} />);

    // Check that field labels exist
    expect(screen.getByText(/Full name/i)).toBeInTheDocument();
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Work email/i)).toBeInTheDocument();
    expect(screen.getByText(/Area of interest/i)).toBeInTheDocument();
    expect(screen.getByText(/Project details/i)).toBeInTheDocument();
  });

  it("shows validation error on submit when required fields are empty", async () => {
    render(<DynamicForm formDef={enquiryForm} />);

    const submitBtn = screen.getByRole("button", { name: new RegExp(enquiryForm.submitLabel, "i") });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
    });
  });
});

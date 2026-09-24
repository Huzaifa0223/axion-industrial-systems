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
    expect(screen.getAllByText(/Area of interest/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Project details/i)).toBeInTheDocument();
  });

  it("renders the submit button and fields can be typed into", () => {
    render(<DynamicForm formDef={enquiryForm} />);
    const submitBtn = screen.getByRole("button", { name: /Send Enquiry/i });
    expect(submitBtn).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText(/Enter full name/i);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect((nameInput as HTMLInputElement).value).toBe("John Doe");
  });
});

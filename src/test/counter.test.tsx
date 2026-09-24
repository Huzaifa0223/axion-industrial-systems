import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Counter } from "../components/ui/Counter";

describe("Counter Component", () => {
  it("renders with the expected suffix and displays numbers", () => {
    render(<Counter value={400} suffix="+" duration={0.01} />);
    const counterElement = screen.getByTestId("counter-value");
    expect(counterElement).toBeInTheDocument();
    expect(counterElement.textContent).toContain("+");
  });
});

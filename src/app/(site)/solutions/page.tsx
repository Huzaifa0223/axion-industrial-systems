import React from "react";
import { getSolutions } from "@/lib/content";
import { SolutionsPinnedScroll } from "@/components/solutions/SolutionsPinnedScroll";

export default function SolutionsPage() {
  const solutions = getSolutions();

  return (
    <div className="pt-20 min-h-screen">
      <SolutionsPinnedScroll items={solutions.items} />
    </div>
  );
}

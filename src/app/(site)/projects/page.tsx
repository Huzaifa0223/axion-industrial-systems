import React, { Suspense } from "react";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import { ProjectsFilterGrid } from "@/components/projects/ProjectsFilterGrid";

export default function ProjectsPage() {
  const { sectors, items, note } = getProjects();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-accent">Projects</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text tracking-tight">
            Commissioned Engineering Projects
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            Proven multi-vendor integration and SCADA modernisation delivered across mission-critical municipal, energy, marine and industrial facilities.
          </p>
        </div>

        {/* Filterable Grid with Suspense */}
        <Suspense fallback={<div className="py-12 text-center text-text-muted font-mono">Loading projects...</div>}>
          <ProjectsFilterGrid sectors={sectors} items={items} note={note} />
        </Suspense>
      </div>
    </div>
  );
}

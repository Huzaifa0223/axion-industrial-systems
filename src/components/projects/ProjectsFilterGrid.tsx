"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ProjectItem, Sector } from "@/lib/schemas/projects";
import { Icon } from "@/components/ui/Icon";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

interface ProjectsFilterGridProps {
  sectors: Sector[];
  items: ProjectItem[];
  note?: string;
}

export function ProjectsFilterGrid({ sectors, items, note }: ProjectsFilterGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSector = searchParams.get("sector") || "all";
  const [activeSector, setActiveSector] = useState(initialSector);

  useEffect(() => {
    const current = searchParams.get("sector") || "all";
    setActiveSector(current);
  }, [searchParams]);

  const handleSelectSector = (sectorId: string) => {
    setActiveSector(sectorId);
    if (sectorId === "all") {
      router.push("/projects", { scroll: false });
    } else {
      router.push(`/projects?sector=${sectorId}`, { scroll: false });
    }
  };

  const filteredItems =
    activeSector === "all"
      ? items
      : items.filter((item) => item.sector === activeSector);

  return (
    <div>
      {/* Sector Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-border pb-6">
        <button
          type="button"
          onClick={() => handleSelectSector("all")}
          className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            activeSector === "all"
              ? "text-white"
              : "text-text-muted hover:text-text hover:bg-surface"
          }`}
        >
          {activeSector === "all" && (
            <motion.div
              layoutId="sector-pill"
              className="absolute inset-0 bg-primary rounded-full z-0"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">All Sectors ({items.length})</span>
        </button>

        {sectors.map((sec) => {
          const count = items.filter((i) => i.sector === sec.id).length;
          const isActive = activeSector === sec.id;

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleSelectSector(sec.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                isActive
                  ? "text-white"
                  : "text-text-muted hover:text-text hover:bg-surface"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sector-pill"
                  className="absolute inset-0 bg-primary rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon name={sec.icon} className="w-3.5 h-3.5" />
                {sec.label} ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredItems.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col rounded-3xl bg-surface border border-border overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="relative w-full h-64 overflow-hidden bg-surface-raised">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-raised/90 backdrop-blur-md border border-border text-[11px] font-mono text-accent uppercase">
                  {project.sector}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {project.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {project.location}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-text group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-accent font-medium">
                    Client: {project.client}
                  </p>

                  <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                    {project.solution}
                  </p>
                </div>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.results.map((res, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-surface-raised border border-border/80"
                    >
                      <div className="font-display font-bold text-lg text-accent">
                        {res.value}
                      </div>
                      <div className="text-[11px] text-text-muted">
                        {res.metric}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Link */}
                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:text-accent transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Note badge */}
      {note && (
        <div className="mt-12 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-border text-[11px] font-mono text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {note}
          </span>
        </div>
      )}
    </div>
  );
}

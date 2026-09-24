import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjects, getProject, getSolution } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Calendar, MapPin, Building, CheckCircle2, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  const { items } = getProjects();
  return items.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-6 uppercase tracking-widest">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-accent">Projects</Link>
          <span>/</span>
          <span className="text-accent">{project.title}</span>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Hero Banner */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent uppercase font-bold">
              {project.sector} Sector
            </span>
            <span className="flex items-center gap-1.5 text-text-muted">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              Commissioned: {project.year}
            </span>
            <span className="flex items-center gap-1.5 text-text-muted">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5 text-text-muted">
              <Building className="w-3.5 h-3.5 text-accent" />
              Client: {project.client}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-text tracking-tight">
            {project.title}
          </h1>
        </div>

        {/* Featured Cover Image */}
        <div className="relative w-full h-80 sm:h-[480px] rounded-3xl overflow-hidden border border-border mb-16 shadow-2xl">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Case Study Grid: Challenge, Solution, Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Challenge */}
            <div className="p-8 rounded-3xl bg-surface border border-border space-y-3">
              <h2 className="text-xl font-display font-bold text-text flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-danger" />
                The Operational Challenge
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Engineering Solution */}
            <div className="p-8 rounded-3xl bg-surface border border-border space-y-3">
              <h2 className="text-xl font-display font-bold text-text flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-success" />
                The Engineered Solution
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Gallery Images if available */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-display font-bold text-text">
                  Site Installation Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-60 rounded-2xl overflow-hidden border border-border"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Results & Related Solutions */}
          <div className="lg:col-span-4 space-y-8">
            {/* Key Deliverable Metrics */}
            <div className="p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-text">
                Quantified Outcomes
              </h3>
              <div className="space-y-4">
                {project.results.map((res, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-surface-raised border border-border"
                  >
                    <div className="font-display font-bold text-3xl text-accent">
                      {res.value}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {res.metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Capabilities */}
            <div className="p-8 rounded-3xl bg-surface border border-border space-y-4">
              <h3 className="font-display font-bold text-base text-text">
                Integrated Capabilities
              </h3>
              <div className="space-y-2">
                {project.solutions.map((solSlug) => {
                  const sol = getSolution(solSlug);
                  return (
                    <Link
                      key={solSlug}
                      href={`/solutions/${solSlug}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-raised border border-border hover:border-accent/40 text-xs font-semibold text-text hover:text-accent transition-colors"
                    >
                      <span>{sol ? sol.title : solSlug}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-border/40">
                <Button href="/contact" size="sm" className="w-full justify-center">
                  Discuss Similar Scope
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSolutions, getSolution } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, ShieldCheck, Factory } from "lucide-react";

export function generateStaticParams() {
  const { items } = getSolutions();
  return items.map((sol) => ({
    slug: sol.slug,
  }));
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-6 uppercase tracking-widest">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/solutions" className="hover:text-accent">Solutions</Link>
          <span>/</span>
          <span className="text-accent">{solution.title}</span>
        </div>

        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Solutions</span>
        </Link>

        {/* Hero Banner */}
        <div className="relative rounded-3xl bg-surface border border-border p-8 sm:p-12 mb-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-accent">
                <Icon name={solution.icon} className="w-6 h-6" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Engineering Capability
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-display font-bold text-text tracking-tight">
                {solution.title}
              </h1>
              <p className="text-base sm:text-lg text-text-muted leading-relaxed">
                {solution.summary}
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  href={`/contact?interest=${encodeURIComponent(solution.title)}`}
                  size="md"
                  variant="primary"
                >
                  Consult an Engineer
                </Button>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Guaranteed SLA & Commissioning</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image
                src={solution.image}
                alt={solution.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Detailed Description & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-display font-bold text-text">
              Architecture & Operational Scope
            </h2>
            <div className="space-y-4 text-text-muted text-base sm:text-lg leading-relaxed font-body">
              {solution.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Applicable Industries */}
            <div className="pt-8 border-t border-border/60">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text mb-4">
                Target Industrial Sectors
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {solution.industries.map((ind) => (
                  <span
                    key={ind}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-raised border border-border text-xs font-medium text-text capitalize"
                  >
                    <Factory className="w-3.5 h-3.5 text-accent" />
                    {ind} Industry
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Deliverables Card */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-surface border border-border h-fit space-y-6 shadow-sm">
            <h3 className="font-display font-bold text-lg text-text">
              Key Deliverables
            </h3>
            <ul className="space-y-3.5">
              {solution.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-border/40">
              <Button
                href={`/contact?interest=${encodeURIComponent(solution.title)}`}
                className="w-full justify-center"
                size="sm"
              >
                Request Deployment Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

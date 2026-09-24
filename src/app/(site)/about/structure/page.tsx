import React from "react";
import Link from "next/link";
import { getAbout } from "@/lib/content";
import { Building2, ArrowRight } from "lucide-react";

export default function StructurePage() {
  const { structure } = getAbout();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/about" className="hover:text-accent">About</Link>
          <span>/</span>
          <span className="text-accent">Business Structure</span>
        </div>

        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text tracking-tight">
            {structure.title}
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            Specialized engineering divisions operating in seamless synchronization to deliver turnkey automation systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {structure.divisions.map((div, i) => (
            <div
              key={div.name}
              className="p-8 rounded-3xl bg-surface border border-border hover:border-accent/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-accent uppercase font-bold tracking-widest">
                  Division 0{i + 1}
                </span>
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text mb-3">
                {div.name}
              </h3>
              <p className="text-base text-text-muted leading-relaxed">
                {div.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

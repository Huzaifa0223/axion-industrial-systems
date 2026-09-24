import React from "react";
import Link from "next/link";
import { getCareers, getForms } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { Briefcase, MapPin, Clock, Award, Check } from "lucide-react";

export default function CareersPage() {
  const careers = getCareers();
  const forms = getForms();
  const applyForm = forms[careers.applyFormId] || forms["career-application"];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-accent">Careers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text tracking-tight">
            {careers.title}
          </h1>
          <p className="mt-4 text-xl text-accent font-medium">
            {careers.intro}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {careers.benefits.map((b, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-surface border border-border hover:border-accent/40 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-accent flex items-center justify-center mb-6 shadow-inner">
                <Icon name={b.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-text mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>

        {/* Open Positions & Application Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Openings List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="text-2xl font-display font-bold text-text">
                Active Openings
              </h2>
              <span className="text-xs font-mono text-accent">
                {careers.openings.length} Positions Available
              </span>
            </div>

            <div className="space-y-6">
              {careers.openings.map((job) => (
                <div
                  key={job.id}
                  className="p-8 rounded-3xl bg-surface border border-border hover:border-accent/40 hover:shadow-xl transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-accent font-mono text-xs font-semibold">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Award className="w-3.5 h-3.5 text-accent" />
                      {job.experience}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-text">
                    {job.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {job.summary}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-mono uppercase text-text font-bold mb-2">
                      Key Qualifications:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, rIdx) => (
                        <span
                          key={rIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-raised border border-border text-xs text-text-muted"
                        >
                          <Check className="w-3.5 h-3.5 text-success" />
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Apply Form Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-surface border border-border shadow-xl space-y-6 sticky top-28">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Direct Submission
              </span>
              <h3 className="text-2xl font-display font-bold text-text mt-1">
                Apply for Engineering Roles
              </h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Submit your profile and credentials directly to our engineering division directors.
              </p>
            </div>

            {applyForm ? (
              <DynamicForm formDef={applyForm} />
            ) : (
              <div className="text-xs text-text-muted">Application form available at enquiry desk.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { FormDef } from "@/lib/schemas/forms";
import { SiteConfig } from "@/lib/schemas/site";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface ContactBandProps {
  title: string;
  formDef: FormDef;
  site: SiteConfig;
}

export function ContactBand({ title, formDef, site }: ContactBandProps) {
  return (
    <section className="py-24 bg-surface/60 border-t border-border/50 relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Direct Engineering Support
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-text mt-2">
                {title}
              </h2>
              <p className="text-sm text-text-muted mt-3 leading-relaxed">
                Connect directly with our engineering and project leads to discuss upgrades, component supply, or emergency troubleshooting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border/80 space-y-4 shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-wider text-text font-bold">
                Office & Field Dispatch
              </h3>
              <div className="space-y-3.5 text-xs text-text-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{site.contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{site.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{site.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{site.contact.hours}</span>
                </div>
              </div>
            </div>

            {/* Industrial SLA Promise card */}
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              <p className="text-xs text-text">
                <strong className="text-accent">24/7 Response Guarantee:</strong> Priority emergency call-outs dispatched within 4 hours.
              </p>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-surface border border-border shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-display font-bold text-text">
                {formDef.title || "Project Enquiry"}
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Fill in your application details for a defensible engineering proposal.
              </p>
            </div>
            <DynamicForm formDef={formDef} />
          </div>
        </div>
      </div>
    </section>
  );
}

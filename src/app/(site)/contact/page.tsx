import React from "react";
import Link from "next/link";
import { getSite, getForms } from "@/lib/content";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass } from "lucide-react";

export default function ContactPage() {
  const site = getSite();
  const forms = getForms();
  const enquiryForm = forms.enquiry;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-accent">Contact Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text tracking-tight">
            Consult With Our Engineering Leads
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            Whether scoping a greenfield automation project, upgrading legacy PLC infrastructure, or requesting emergency site troubleshooting, our senior technical team is ready.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office & Telemetry Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
              <h2 className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                Headquarters & Dispatch Center
              </h2>

              <div className="space-y-4 text-sm text-text-muted">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text text-xs uppercase font-mono">Location</strong>
                    <span>{site.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text text-xs uppercase font-mono">Telephone</strong>
                    <span>{site.contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text text-xs uppercase font-mono">Email Dispatch</strong>
                    <span>{site.contact.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text text-xs uppercase font-mono">Operational Hours</strong>
                    <span>{site.contact.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Compass className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-text text-xs uppercase font-mono">GPS Coordinates</strong>
                    <span className="font-mono text-xs">{site.contact.coordinates.lat}° N, {site.contact.coordinates.lng}° E</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Badge */}
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Certified System Integrator SLA</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                All client enquiries are assigned directly to a named Controls Engineer with responses within one working day.
              </p>
            </div>
          </div>

          {/* Right Column: Enquiry Form Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-surface border border-border shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-text">
                {enquiryForm.title || "Send an Enquiry"}
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Provide your facility specifications and requirements below.
              </p>
            </div>

            <DynamicForm formDef={enquiryForm} />
          </div>
        </div>
      </div>
    </div>
  );
}

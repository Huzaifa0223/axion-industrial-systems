import React from "react";
import Link from "next/link";
import { getAbout } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

export default function FirmwarePage() {
  const { firmware } = getAbout();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/about" className="hover:text-accent">About</Link>
          <span>/</span>
          <span className="text-accent">Our Firmware</span>
        </div>

        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text tracking-tight">
            {firmware.title}
          </h1>
          <p className="mt-4 text-xl text-accent font-medium">
            {firmware.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {firmware.values.map((val, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-surface border border-border hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-accent flex items-center justify-center mb-6 shadow-inner">
                  <Icon name={val.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-bold text-text mb-3">
                  {val.title}
                </h3>
                <p className="text-base text-text-muted leading-relaxed font-body">
                  {val.text}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 font-mono text-[11px] text-accent uppercase tracking-wider">
                Standard Protocol 0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

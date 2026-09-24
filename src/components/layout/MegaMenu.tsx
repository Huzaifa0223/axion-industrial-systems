"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ArrowRight } from "lucide-react";

interface MegaMenuItem {
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

interface MegaMenuProps {
  title: string;
  items: MegaMenuItem[];
  onClose: () => void;
  isOpen: boolean;
}

export function MegaMenu({ title, items, onClose, isOpen }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label={`${title} Submenu`}
      className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl mt-3 p-6 rounded-2xl glass-card shadow-2xl border border-border/80 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent">{title}</h3>
          <p className="text-xs text-text-muted mt-0.5">Explore our certified industrial hardware and engineering capabilities</p>
        </div>
        <span className="text-xs font-mono text-text-muted/60">{items.length} Modules</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex flex-col p-3.5 rounded-xl hover:bg-surface-raised transition-all duration-150 border border-transparent hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              {item.icon ? (
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:text-accent group-hover:scale-110 transition-transform">
                  <Icon name={item.icon} className="w-4 h-4" />
                </div>
              ) : null}
              <span className="text-sm font-semibold text-text group-hover:text-accent transition-colors flex-1">
                {item.label}
              </span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
            </div>
            {item.description ? (
              <p className="text-xs text-text-muted line-clamp-2 pl-10.5">{item.description}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

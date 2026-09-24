"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: any;
  site: any;
}

export function MobileNav({ isOpen, onClose, navigation, site }: MobileNavProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={containerRef}
        className="relative w-full max-w-sm h-full bg-surface border-l border-border shadow-2xl flex flex-col justify-between overflow-y-auto p-6 z-10 animate-in slide-in-from-right duration-250"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <span className="font-display font-bold text-xl tracking-tight text-text">
              {site.brand.name}
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-full hover:bg-surface-raised text-text border border-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="py-6 space-y-2">
            {navigation.primary.map((item: any, idx: number) => {
              const hasSubmenu = item.items && item.items.length > 0;
              const isExpanded = expandedIndex === idx;

              return (
                <div key={item.label} className="border-b border-border/40 pb-2">
                  {hasSubmenu ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleExpand(idx)}
                        className="w-full flex items-center justify-between py-2.5 text-base font-semibold text-text hover:text-accent transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-accent" : "text-text-muted"
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="pl-3 py-2 space-y-2">
                          {item.items.map((sub: any) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className="flex items-center gap-2.5 py-1.5 text-sm text-text-muted hover:text-accent transition-colors"
                            >
                              {sub.icon && <Icon name={sub.icon} className="w-4 h-4 text-primary" />}
                              <span>{sub.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      onClick={onClose}
                      className="block py-2.5 text-base font-semibold text-text hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer in Drawer */}
        <div className="pt-6 border-t border-border space-y-4">
          <Button href={navigation.cta.href} onClick={onClose} className="w-full justify-center">
            {navigation.cta.label}
          </Button>
          <div className="text-xs text-text-muted text-center">
            {site.contact.phone} • {site.contact.email}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/theme/ThemeProvider";

interface HeaderProps {
  site: any;
  navigation: any;
}

export function Header({ site, navigation }: HeaderProps) {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Glass effect threshold: 60px
      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current + 8) {
          setIsVisible(false); // scrolling down
          setActiveMenu(null);
        } else if (currentScrollY < lastScrollY.current - 8) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key to close open menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    menuTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "glass-header h-[68px] shadow-lg shadow-black/5"
            : "bg-transparent h-[88px]"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src={site.brand.logo.mark}
                alt={site.brand.name}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
              />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-text">
              {site.brand.name}
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-surface border border-border text-text-muted">
              Engineering
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5" role="menubar">
            {navigation.primary.map((item: any) => {
              const isMega = item.type === "mega";
              const isDropdown = item.type === "dropdown";
              const hasSub = isMega || isDropdown;
              const isCurrentActive = activeMenu === item.label;

              if (!hasSub) {
                return (
                  <Link
                    key={item.label}
                    href={item.href || "/"}
                    role="menuitem"
                    className="px-3.5 py-2 text-sm font-medium text-text/90 hover:text-accent rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={isCurrentActive}
                    onClick={() => setActiveMenu(isCurrentActive ? null : item.label)}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isCurrentActive
                        ? "text-accent bg-surface-raised/80"
                        : "text-text/90 hover:text-accent hover:bg-surface/50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isCurrentActive ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>

                  {/* Mega Menu */}
                  {isMega && (
                    <MegaMenu
                      title={item.label}
                      items={item.items || []}
                      isOpen={isCurrentActive}
                      onClose={() => setActiveMenu(null)}
                    />
                  )}

                  {/* Simple Dropdown */}
                  {isDropdown && isCurrentActive && (
                    <div
                      role="menu"
                      className="absolute top-full left-0 w-64 mt-2 p-2 rounded-xl glass-card shadow-xl border border-border animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                    >
                      {item.items.map((sub: any) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setActiveMenu(null)}
                          role="menuitem"
                          className="block p-2.5 rounded-lg hover:bg-surface-raised text-text hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <div className="text-sm font-semibold">{sub.label}</div>
                          {sub.description && (
                            <div className="text-xs text-text-muted mt-0.5">
                              {sub.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button href={navigation.cta.href} size="sm" variant="primary">
                {navigation.cta.label}
              </Button>
            </div>
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-lg text-text hover:bg-surface border border-border"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navigation={navigation}
        site={site}
      />
    </>
  );
}

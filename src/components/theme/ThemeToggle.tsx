"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`p-2 rounded-full transition-colors text-muted hover:text-text hover:bg-surface border border-border/60 ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-accent transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-primary transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}

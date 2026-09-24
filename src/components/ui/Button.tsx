"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  magnetic?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  magnetic = true,
}: ButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !magnetic || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Max 8px pull as specified in animations.json
    const maxPull = 8;
    const pullX = Math.max(-maxPull, Math.min(maxPull, middleX * 0.15));
    const pullY = Math.max(-maxPull, Math.min(maxPull, middleY * 0.15));
    setPosition({ x: pullX, y: pullY });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs font-medium rounded-full",
    md: "px-5 py-2.5 text-sm font-semibold rounded-full",
    lg: "px-7 py-3.5 text-base font-semibold rounded-full",
  };

  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-primary/25 border border-primary/20 hover:border-accent/40",
    secondary:
      "bg-surface hover:bg-surface-raised text-text border border-border hover:border-text-muted/40",
    outline:
      "border border-border text-text hover:bg-surface hover:border-accent",
    ghost:
      "text-text-muted hover:text-text hover:bg-surface/50 border border-transparent",
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <span
        className={`relative inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer overflow-hidden ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {content}
    </button>
  );
}

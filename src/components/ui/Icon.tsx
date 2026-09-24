import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number | string;
}

export function Icon({ name, className = "w-5 h-5", size = 20, ...props }: IconProps) {
  // Convert kebab-case to PascalCase (e.g. "shield-check" -> "ShieldCheck")
  const pascalName = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  const LucideIcon = (LucideIcons as Record<string, any>)[pascalName] || LucideIcons.HelpCircle;

  return <LucideIcon className={className} size={size} {...props} />;
}

import React from "react";

export function ParticleFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10 opacity-70 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(91,75,255,0.3),_transparent_60%),_radial-gradient(ellipse_at_80%_70%,_rgba(34,211,255,0.2),_transparent_55%)]"
    />
  );
}

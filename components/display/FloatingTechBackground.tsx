"use client";

import { useMemo } from "react";
import { TECH_STACK } from "@/lib/techLogos";

export default function FloatingTechBackground({
  photoUrl,
}: {
  photoUrl?: string | null;
}) {
  // Quadruple array for seamless loop across ultra-wide / 4K displays
  const marqueeItems = useMemo(
    () => [...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#07090e] pointer-events-none select-none">
      {/* Optional Photo Layer (from Supabase or background) */}
      {photoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 filter brightness-75 contrast-110"
        />
      )}

      {/* Cyber Grid Pattern — fine & subtle */}
      <div className="cyber-grid-bg absolute inset-0 opacity-70" />

      {/* Soft Ambient Glow in Corners */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-600/08 blur-[130px]" />

      {/* Bottom Sleek Tech Stack Ticker (Marquee) — Linear / Vercel Style */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/[0.08] bg-slate-950/70 py-2.5 backdrop-blur-xl portrait:py-1.5">
        <div className="marquee-mask overflow-hidden">
          <div className="tech-marquee-track flex items-center gap-8 portrait:gap-4">
            {marqueeItems.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`${tech.id}-${idx}`}
                  className="flex shrink-0 items-center gap-2.5 opacity-60 transition-opacity hover:opacity-100 portrait:gap-1.5"
                >
                  <Icon className="h-5 w-5 drop-shadow portrait:h-3.5 portrait:w-3.5" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-slate-300 portrait:text-[9px]">
                    {tech.name}
                  </span>
                  <span className="mx-2 text-slate-700 portrait:mx-1">•</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

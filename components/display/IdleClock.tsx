"use client";

import { useEffect, useRef, useState } from "react";
import { toYouTubeEmbedUrl } from "@/lib/youtube";
import { formatEnglishDate, formatTimeDigits } from "@/lib/date";
import { NATURE_IMAGES } from "@/lib/idleNature";
import { TECH_QUOTES, randomQuoteIndex } from "@/lib/idleQuotes";
import FloatingTechBackground from "./FloatingTechBackground";
import SplitFlapClock from "./SplitFlapClock";

const NATURE_ROTATE_MS = 30_000;
const QUOTE_ROTATE_MS = 15_000;

type QuoteVertical = "top" | "middle" | "bottom";

type ClockPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "mid-left"
  | "mid-center"
  | "mid-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const QUOTE_VERTICAL_CLASSES: Record<QuoteVertical, string> = {
  top: "top-20 sm:top-24",
  middle: "top-1/2 -translate-y-1/2",
  bottom: "bottom-12 sm:bottom-14",
};

const CLOCK_POSITION_CLASSES: Record<ClockPosition, string> = {
  "top-left": "top-20 sm:top-24 left-4 sm:left-8",
  "top-center": "top-20 sm:top-24 left-1/2 -translate-x-1/2",
  "top-right": "top-20 sm:top-24 right-4 sm:right-8",
  "mid-left": "top-1/2 -translate-y-1/2 left-4 sm:left-8",
  "mid-center": "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
  "mid-right": "top-1/2 -translate-y-1/2 right-4 sm:right-8",
  "bottom-left": "bottom-12 sm:bottom-14 left-4 sm:left-8",
  "bottom-center": "bottom-12 sm:bottom-14 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-12 sm:bottom-14 right-4 sm:right-8",
};

const QUOTE_VERTICALS: QuoteVertical[] = ["top", "middle", "bottom"];

// Collision-free map: clock only picks slots that never collide with the quote card
const SAFE_CLOCK_MAP: Record<QuoteVertical, ClockPosition[]> = {
  top: [
    "mid-left",
    "mid-center",
    "mid-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ],
  middle: [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ],
  bottom: [
    "top-left",
    "top-center",
    "top-right",
    "mid-left",
    "mid-center",
    "mid-right",
  ],
};

function pickRandomPositions(
  prevQuote?: QuoteVertical,
  prevClock?: ClockPosition
): { quote: QuoteVertical; clock: ClockPosition } {
  const quoteCandidates = prevQuote
    ? QUOTE_VERTICALS.filter((v) => v !== prevQuote)
    : QUOTE_VERTICALS;
  const quote =
    quoteCandidates[Math.floor(Math.random() * quoteCandidates.length)];

  const safeList = SAFE_CLOCK_MAP[quote];
  const clockCandidates = prevClock
    ? safeList.filter((c) => c !== prevClock)
    : safeList;
  const clock =
    clockCandidates[Math.floor(Math.random() * clockCandidates.length)] ||
    safeList[0];

  return { quote, clock };
}

export default function IdleClock({
  now,
  youtubeUrl,
  audioUrl,
  audioPlaying,
  customLogoUrl,
  backgroundUrls,
  brightness,
}: {
  now: Date;
  youtubeUrl: string | null;
  audioUrl: string | null;
  audioPlaying: boolean;
  customLogoUrl?: string | null;
  backgroundUrls?: string[];
  brightness?: number;
}) {
  const images =
    backgroundUrls && backgroundUrls.length > 0
      ? backgroundUrls
      : NATURE_IMAGES;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [natureIndex, setNatureIndex] = useState(() =>
    images.length > 1 ? Math.floor(Math.random() * images.length) : 0
  );
  const [quoteIndex, setQuoteIndex] = useState(() => randomQuoteIndex());
  const [positions, setPositions] = useState<{
    quote: QuoteVertical;
    clock: ClockPosition;
  }>(() => pickRandomPositions());

  useEffect(() => {
    if (natureIndex >= images.length && images.length > 0) {
      setNatureIndex(0);
    }
  }, [images.length, natureIndex]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (audioPlaying) {
      el.play().catch(() => {
        // Autoplay refused by the browser — nothing more we can do here.
      });
    } else {
      el.pause();
    }
  }, [audioPlaying, audioUrl]);

  // Synchronously rotate background & move clock & quote to new collision-free random positions
  useEffect(() => {
    if (youtubeUrl) return;
    const id = setInterval(() => {
      setNatureIndex((prev) => {
        if (images.length <= 1) return 0;
        let next = Math.floor(Math.random() * images.length);
        if (next === prev) next = (next + 1) % images.length;
        return next;
      });
      setPositions((prev) => pickRandomPositions(prev.quote, prev.clock));
    }, NATURE_ROTATE_MS);
    return () => clearInterval(id);
  }, [youtubeUrl, images.length]);

  useEffect(() => {
    if (youtubeUrl) return;
    const id = setInterval(() => {
      setQuoteIndex((i) => randomQuoteIndex(i));
    }, QUOTE_ROTATE_MS);
    return () => clearInterval(id);
  }, [youtubeUrl]);

  const { hours, minutes, seconds } = formatTimeDigits(now);
  const quote = TECH_QUOTES[quoteIndex];

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-slate-950"
      style={{ perspective: "1400px" }}
    >
      {youtubeUrl ? (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
            src={toYouTubeEmbedUrl(youtubeUrl)}
            title="Latar video"
            allow="autoplay; encrypted-media"
            frameBorder={0}
          />
        </div>
      ) : (
        /* Floating Programming Language Badges & Cyber Background */
        <FloatingTechBackground
          photoUrl={
            backgroundUrls && backgroundUrls.length > 0
              ? images[natureIndex % images.length]
              : null
          }
          brightness={brightness}
        />
      )}

      {audioUrl && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio ref={audioRef} src={audioUrl} loop className="hidden" />
      )}

      {/* Header Dual Logo Badge (Politeknik WBI & HIMATRPL) — Enlarge container & logos */}
      <div className="absolute inset-x-0 top-3 sm:top-4 z-30 flex justify-center">
        <div className="idle-foreground-float glass-panel-subtle flex items-center gap-3.5 rounded-2xl px-5 py-2 sm:gap-5 sm:px-7 sm:py-3 portrait:gap-3.5 portrait:rounded-2xl portrait:px-5 portrait:py-2.5 shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/wbi.webp"
            alt="Politeknik WBI"
            className="h-8 w-auto object-contain drop-shadow sm:h-11 portrait:h-9"
          />
          <div className="h-6 w-px bg-white/25 sm:h-8 portrait:h-7" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={customLogoUrl || "/logos/trpl.png"}
            alt="TRPL"
            className="h-8 w-auto object-contain drop-shadow sm:h-11 portrait:h-9"
          />
        </div>
      </div>

      {/* Clock & Quote Overlays */}
      {youtubeUrl ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center px-8">
          <div className="glass-panel flex flex-col items-center gap-4 rounded-3xl px-10 py-10 sm:px-16 sm:py-12 portrait:gap-2 portrait:rounded-xl portrait:px-4 portrait:py-4 portrait:w-auto portrait:max-w-[200px]">
            <SplitFlapClock now={now} />
            <p className="text-center text-lg font-heading text-foreground/70 sm:text-2xl portrait:text-xs">
              {formatEnglishDate(now)}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Developer Cyber Glass Clock Widget
              - Extra compact size
              - Freely moves to any safe random position across the 9-grid without colliding with quote card
          */}
          <div
            className={`idle-foreground-float glass-panel absolute z-20 flex flex-col items-center rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 gap-0.5 shadow-lg transition-all duration-700 pointer-events-none ${CLOCK_POSITION_CLASSES[positions.clock]}`}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-emerald-300">
                LIVE
              </span>
            </div>
            <p className="font-mono text-xl sm:text-2xl font-black tabular-nums tracking-tight text-white drop-shadow-sm">
              {hours}:{minutes}:{seconds}
            </p>
            <p className="text-center text-[8px] sm:text-[9px] font-mono text-slate-300/80">
              {formatEnglishDate(now)}
            </p>
          </div>

          {/* Code Editor / Terminal Window Glass Quote Card
              - Horizontally centered always (inset-x-0 flex justify-center)
              - Vertically moves randomly across top, middle, and bottom without colliding with clock
          */}
          <div
            className={`absolute inset-x-0 z-10 flex justify-center px-4 transition-all duration-700 pointer-events-none ${QUOTE_VERTICAL_CLASSES[positions.quote]}`}
          >
            <div
              key={quoteIndex}
              className="idle-foreground-float glass-panel w-full max-w-xs sm:max-w-sm overflow-hidden rounded-xl"
            >
              {/* Terminal / Code Editor Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-2.5 py-1.5">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444] shadow-sm shadow-red-500/50" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#eab308] shadow-sm shadow-yellow-500/50" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] shadow-sm shadow-emerald-500/50" />
                  <span className="ml-1 font-mono text-[8px] text-slate-400">
                    ~/trpl/wisdom.ts
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-blue-500/10 px-1.5 py-0 border border-blue-400/25">
                  <span className="font-mono text-[7px] font-bold text-blue-300 uppercase tracking-widest">
                    TS
                  </span>
                </div>
              </div>

              {/* Code Editor Content */}
              <div className="flex p-2.5 sm:p-3">
                {/* Line Numbers */}
                <div className="select-none pr-2 font-mono text-[8px] text-slate-500/70 flex flex-col gap-0.5 border-r border-white/10">
                  <span>01</span>
                  <span>02</span>
                </div>

                {/* Quote Text & Author */}
                <div className="pl-2 flex flex-col justify-center">
                  <p className="font-heading text-xs sm:text-sm font-semibold leading-snug text-white drop-shadow-sm">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="font-mono text-[8px] sm:text-[9px] font-semibold text-cyan-300">
                      {"// — "}{quote.author}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

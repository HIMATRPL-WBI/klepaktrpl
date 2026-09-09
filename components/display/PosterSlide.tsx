"use client";

import { createClient } from "@/lib/supabase";
import type { Poster } from "@/lib/types";

export function getPosterPublicUrl(storagePath: string): string {
  const supabase = createClient();
  return supabase.storage.from("signage-images").getPublicUrl(storagePath)
    .data.publicUrl;
}

export default function PosterSlide({ poster }: { poster: Poster }) {
  const url = getPosterPublicUrl(poster.storage_path);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-950">
      {/* Ambient blurred backdrop so any screen ratio blends seamlessly */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 filter blur-3xl"
      />

      {/* Main Poster Image:
          - In Portrait (9:16 TV): Fills the entire screen 100% edge-to-edge (object-cover)
          - In Landscape: Displayed in vertical 9:16 ratio with ambient backdrop
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={poster.caption ?? ""}
        className="relative z-10 h-full w-full object-contain portrait:h-full portrait:w-full portrait:object-cover landscape:max-w-[100vh] landscape:aspect-[9/16] landscape:object-cover landscape:shadow-2xl"
      />

      {/* Sleek Gradient Overlay Caption */}
      {poster.caption && (
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-8 pb-8 pt-20 text-center">
          <p className="mx-auto max-w-4xl font-heading text-xl font-semibold leading-snug text-white drop-shadow-md sm:text-2xl portrait:text-2xl sm:portrait:text-3xl">
            {poster.caption}
          </p>
        </div>
      )}
    </div>
  );
}

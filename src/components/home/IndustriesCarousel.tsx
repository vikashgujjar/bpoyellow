"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  HeartPulse,
  Landmark,
  Plane,
  ShoppingBag,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Industry } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  logistics: Truck,
  banking: Landmark,
  retail: ShoppingBag,
  "real-estate": Building2,
  healthcare: HeartPulse,
  travel: Plane,
  energy: Zap,
};

export default function IndustriesCarousel({ industries }: { industries: Industry[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = industries.length;
  const go = (i: number) => setIndex((i + count) % count);
  const current = industries[index];
  const Icon = icons[current.id];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
      {/* Horizontal swipes here change the industry, vertical ones still change the section. */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Industries"
        className="relative flex min-h-[260px] flex-col overflow-hidden rounded-[1.5rem] bg-brand p-6 text-ink sm:min-h-[340px] sm:rounded-[2rem] sm:p-10"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <Icon
          className="pointer-events-none absolute -bottom-10 -right-8 h-64 w-64 opacity-[0.09] sm:h-80 sm:w-80"
          strokeWidth={1.4}
          aria-hidden
        />
        <div className="flex items-center justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-brand">
            <Icon className="h-7 w-7" aria-hidden />
          </span>
          <span className="text-sm font-extrabold tabular-nums" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        <div key={current.id} className="mt-auto pt-8 motion-safe:animate-[industry-in_500ms_cubic-bezier(0.22,1,0.36,1)]">
          <h3 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-5xl">{current.title}</h3>
          <p className="mt-3 max-w-md text-base font-medium leading-relaxed text-ink/75 sm:text-lg">
            {current.body}
          </p>
        </div>

        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous industry"
            className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition-transform active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next industry"
            className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition-transform active:scale-95"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <ul className="hidden flex-wrap content-center gap-2 sm:flex lg:flex-col lg:flex-nowrap">
        {industries.map((industry, i) => {
          const ItemIcon = icons[industry.id];
          const selected = i === index;
          return (
            <li key={industry.id}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-pressed={selected}
                className={`flex w-full items-center gap-3 rounded-full border px-4 py-2.5 text-left text-sm font-bold transition-colors sm:text-base lg:px-5 lg:py-3 ${
                  selected
                    ? "border-brand bg-brand text-ink"
                    : "border-white/15 text-white hover:border-white/40"
                }`}
              >
                <ItemIcon className="h-4 w-4 shrink-0" aria-hidden />
                {industry.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

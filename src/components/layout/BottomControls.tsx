"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useSectionNav } from "./SectionNavigation";

/** Fixed up/down arrows, next-section pill and progress dots — visible on every section. */
export default function BottomControls() {
  const { sections, active, theme, goTo, next, prev } = useSectionNav();
  const dark = theme === "black";
  const isFirst = active === 0;
  const isLast = active === sections.length - 1;

  const circle = `grid h-12 w-12 place-items-center rounded-full transition-[background-color,color,opacity,transform] duration-300 delay-[380ms] hover:delay-0 active:scale-95 disabled:pointer-events-none disabled:opacity-35 ${
    dark ? "bg-white/12 text-white hover:bg-white/20" : "bg-ink/8 text-ink hover:bg-ink/14"
  }`;

  return (
    <>
      <nav
        aria-label="Section controls"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex h-[var(--controls-h)] items-center justify-center gap-3 px-4"
      >
        <button
          type="button"
          onClick={prev}
          disabled={isFirst}
          aria-label="Previous section"
          className={`pointer-events-auto ${circle}`}
        >
          <ChevronUp className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={isLast}
          aria-label="Next section"
          className={`pointer-events-auto ${circle}`}
        >
          <ChevronDown className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => (isLast ? goTo(0) : next())}
          className={`pointer-events-auto hidden h-12 items-center rounded-full px-6 text-[1.05rem] font-bold transition-colors duration-300 delay-[380ms] hover:delay-0 sm:inline-flex ${
            dark ? "bg-white/12 text-white hover:bg-white/20" : "bg-ink/8 text-ink hover:bg-ink/14"
          }`}
        >
          {isLast ? "To the Top" : sections[active + 1].label}
        </button>
        <span
          className={`pointer-events-none ml-1 hidden text-sm font-bold tabular-nums transition-colors md:inline ${
            dark ? "text-white/60" : "text-ink/55"
          }`}
          aria-hidden
        >
          {String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </span>
      </nav>

      <nav
        aria-label="Sections"
        className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col items-end gap-2.5">
          {sections.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={s.label}
                aria-current={i === active ? "true" : undefined}
                className="group flex items-center gap-3 py-0.5"
              >
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
                    dark ? "bg-white text-ink" : "bg-ink text-white"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block w-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "h-7" : "h-1.5"
                  } ${dark ? "bg-white" : "bg-ink"} ${i === active ? "" : "opacity-40"}`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

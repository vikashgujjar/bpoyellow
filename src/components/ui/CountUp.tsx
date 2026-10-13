"use client";

import { useEffect, useState } from "react";
import { useSectionNav } from "@/components/layout/SectionNavigation";

const DURATION_MS = 1500;
const START_DELAY_MS = 450;

/** Counts the leading number of `value` (e.g. "4.7/5.0", "12 yrs+") up from zero on each visit. */
export default function CountUp({ value, sectionId }: { value: string; sectionId: string }) {
  const { sections, active } = useSectionNav();
  const isActive = sections[active].id === sectionId;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!isActive || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(match[1]);
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const suffix = match[2];
    const start = performance.now() + START_DELAY_MS;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / DURATION_MS));
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay((target * eased).toFixed(decimals) + suffix);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
  }, [isActive, value]);

  return (
    <>
      <span aria-hidden className="tabular-nums">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

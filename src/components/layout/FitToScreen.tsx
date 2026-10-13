"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Never let a section scroll: shrink its content uniformly until it fits the stage. */
const MIN_SCALE = 0.45;
const SAFETY = 0.98;
const MAX_ITERATIONS = 6;

export default function FitToScreen({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!stage || !content) return;

    let frame = 0;

    const apply = (scale: number) => content.style.setProperty("--fit", String(scale));

    const fit = () => {
      const available = stage.clientHeight * SAFETY;

      // Content is widened by 1/scale (see .vs-fit), which makes it shorter, so solve
      // scale = available / height(scale) by fixed-point iteration from scale 1.
      // offsetHeight ignores transforms, so each measurement is the unscaled height.
      let scale = 1;
      apply(scale);
      for (let i = 0; i < MAX_ITERATIONS; i++) {
        const needed = content.offsetHeight;
        if (needed * scale <= available + 0.5) break;
        scale = Math.max(MIN_SCALE, Math.min(1, available / needed));
        apply(scale);
        if (scale === MIN_SCALE) break;
      }

      apply(Math.floor(scale * 1000) / 1000);
    };

    // Batch observer callbacks into one measurement per frame (avoids observer loops).
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    fit();
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    observer.observe(content);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={stageRef} className="vs-stage">
      <div ref={contentRef} className="vs-fit">
        {children}
      </div>
    </div>
  );
}

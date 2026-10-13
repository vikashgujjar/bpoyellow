"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Header from "./Header";
import BottomControls from "./BottomControls";
import FitToScreen from "./FitToScreen";

export type SectionTheme = "yellow" | "black" | "cream";

export type SectionConfig = {
  id: string;
  label: string;
  theme: SectionTheme;
  content: ReactNode;
};

export type SectionMeta = Omit<SectionConfig, "content">;

type NavContextValue = {
  sections: SectionMeta[];
  active: number;
  theme: SectionTheme;
  goTo: (target: number | string) => void;
  next: () => void;
  prev: () => void;
  setPaused: (paused: boolean) => void;
};

const NavContext = createContext<NavContextValue | null>(null);

export function useSectionNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useSectionNav must be used inside <SectionNavigation>");
  return ctx;
}

/** Duration of one section transition. Keep in sync with --vs-duration in globals.css. */
const TRANSITION_MS = 850;
/** Extra quiet time after a transition before new input is accepted. */
const LOCK_BUFFER_MS = 120;
/** A wheel event arriving within this gap belongs to the same gesture (incl. trackpad inertia). */
const WHEEL_GESTURE_GAP_MS = 220;
/** Longest pause that can still be part of a decaying inertia tail. */
const WHEEL_INERTIA_MAX_GAP_MS = 600;
const WHEEL_THRESHOLD = 40;
/** Smallest whole-number delta treated as one mouse-wheel notch (Chrome/Edge send ~100). */
const MOUSE_NOTCH_MIN_DELTA = 50;
const SWIPE_THRESHOLD = 50;

/** Elements whose own input must never move between sections. */
const IGNORE_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [data-nav-ignore]';

export default function SectionNavigation({ sections }: { sections: SectionConfig[] }) {
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const activeRef = useRef(0);
  const lockedRef = useRef(false);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const meta = useMemo<SectionMeta[]>(
    () => sections.map(({ id, label, theme }) => ({ id, label, theme })),
    [sections],
  );
  const count = sections.length;

  const goTo = useCallback(
    (target: number | string) => {
      const index =
        typeof target === "number" ? target : meta.findIndex((s) => s.id === target);
      if (index < 0 || index >= count || index === activeRef.current) return;
      if (lockedRef.current) return;

      lockedRef.current = true;
      activeRef.current = index;
      setActive(index);
      setAnnouncement(`Section ${index + 1} of ${count}: ${meta[index].label}`);

      const url =
        index === 0 ? window.location.pathname + window.location.search : `#${meta[index].id}`;
      window.history.replaceState(null, "", url);

      if (unlockTimer.current) clearTimeout(unlockTimer.current);
      const duration = reducedMotionRef.current ? 0 : TRANSITION_MS;
      unlockTimer.current = setTimeout(() => {
        lockedRef.current = false;
      }, duration + LOCK_BUFFER_MS);
    },
    [count, meta],
  );

  const next = useCallback(() => goTo(activeRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(activeRef.current - 1), [goTo]);
  const setPaused = useCallback((paused: boolean) => {
    pausedRef.current = paused;
  }, []);

  // Reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Deep links: open the section named in the URL hash, and follow later hash changes.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) goTo(id);
    };
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [goTo]);

  // Wheel, keyboard and touch input.
  useEffect(() => {
    let wheelAccum = 0;
    let lastWheelAt = 0;
    let lastWheelAbs = 0;
    let gestureConsumed = false;

    const isIgnored = (target: EventTarget | null) =>
      target instanceof Element && target.closest(IGNORE_SELECTOR) !== null;

    const onWheel = (e: WheelEvent) => {
      if (pausedRef.current || e.ctrlKey) return; // ctrlKey = pinch zoom
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (isIgnored(e.target)) return;
      e.preventDefault();

      const now = performance.now();
      const gap = now - lastWheelAt;
      const abs = Math.abs(e.deltaY);
      const decaying = abs < lastWheelAbs;
      // A still-decaying delta after a short pause is trackpad inertia, not a new flick.
      const inertiaTail = gestureConsumed && gap < WHEEL_INERTIA_MAX_GAP_MS && decaying;
      if (gap > WHEEL_GESTURE_GAP_MS && !inertiaTail) {
        gestureConsumed = false;
        wheelAccum = 0;
      }
      lastWheelAt = now;
      lastWheelAbs = abs;

      if (lockedRef.current) return;

      // Mouse wheels send discrete notches (line/page mode, or large whole-number deltas)
      // with no inertia. Once the previous transition has finished, a non-decaying notch
      // is a fresh intent even mid-stream, so continuous rolling keeps moving one section
      // per transition instead of stalling until the user pauses.
      const mouseNotch =
        e.deltaMode !== 0 || (abs >= MOUSE_NOTCH_MIN_DELTA && Number.isInteger(e.deltaY));
      if (mouseNotch && !decaying) {
        gestureConsumed = true;
        wheelAccum = 0;
        if (e.deltaY > 0) next();
        else prev();
        return;
      }

      if (gestureConsumed) return;

      wheelAccum += e.deltaY;
      if (Math.abs(wheelAccum) >= WHEEL_THRESHOLD) {
        gestureConsumed = true;
        wheelAccum = 0;
        if (e.deltaY > 0) next();
        else prev();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (pausedRef.current || e.altKey || e.ctrlKey || e.metaKey) return;
      if (isIgnored(e.target)) return;

      let action: (() => void) | null = null;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          action = next;
          break;
        case "ArrowUp":
        case "PageUp":
          action = prev;
          break;
        case " ":
          // Space activates focused buttons/links; only navigate from the page itself.
          if (e.target instanceof Element && e.target.closest("button, a, summary")) return;
          action = e.shiftKey ? prev : next;
          break;
        case "Home":
          action = () => goTo(0);
          break;
        case "End":
          action = () => goTo(count - 1);
          break;
        default:
          return;
      }
      e.preventDefault();
      if (!e.repeat) action();
    };

    let touchStartX = 0;
    let touchStartY = 0;
    let touchTracking = false;

    const onTouchStart = (e: TouchEvent) => {
      touchTracking = !pausedRef.current && e.touches.length === 1 && !isIgnored(e.target);
      if (!touchTracking) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    // Vertical swipes must not start a native scroll/fling: a leftover fling makes the
    // browser swallow the user's next tap (tap-to-stop-fling).
    const onTouchMove = (e: TouchEvent) => {
      if (!touchTracking || !e.cancelable) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      if (Math.abs(dy) > Math.abs(dx)) e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchTracking) return;
      touchTracking = false;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      if (Math.abs(dy) < SWIPE_THRESHOLD || Math.abs(dy) < Math.abs(dx) * 1.2) return;
      if (dy < 0) next();
      else prev();
    };

    const onTouchCancel = () => {
      touchTracking = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [count, goTo, next, prev]);

  useEffect(
    () => () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    },
    [],
  );

  const theme = meta[active].theme;
  const contextValue = useMemo<NavContextValue>(
    () => ({ sections: meta, active, theme, goTo, next, prev, setPaused }),
    [meta, active, theme, goTo, next, prev, setPaused],
  );

  return (
    <NavContext.Provider value={contextValue}>
      {/* overflow-clip (not hidden): the stage must never become scrollable, or hash/anchor
          jumps would shift every section out of frame. */}
      <div className="fixed inset-0 overflow-clip bg-ink" data-theme-active={theme}>
        <Header />

        <main>
          {sections.map((section, i) => {
            const state = i === active ? "active" : i < active ? "past" : "future";
            return (
              <section
                key={section.id}
                id={section.id}
                aria-label={section.label}
                aria-hidden={state !== "active"}
                inert={state !== "active"}
                data-state={state}
                data-theme={section.theme}
                className="vs-section"
                style={{ zIndex: i + 1 }}
              >
                <FitToScreen>{section.content}</FitToScreen>
              </section>
            );
          })}
        </main>

        <BottomControls />

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>
    </NavContext.Provider>
  );
}

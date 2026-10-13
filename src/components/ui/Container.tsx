import type { CSSProperties, ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`vs-container ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border-2 border-current px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] ${className}`}
    >
      {children}
    </p>
  );
}

/** Stagger step for `.reveal` elements (see globals.css). */
export function delay(step: number) {
  return { "--d": step } as CSSProperties;
}

import { Fragment, type CSSProperties, type ElementType } from "react";

type Part = string | { text: string; className?: string };

type Props = {
  as?: ElementType;
  parts: Part[];
  className?: string;
  /** Stagger index of the first word (see .word in globals.css). */
  start?: number;
};

/** Heading whose words slide up from behind a mask each time its section is entered. */
export default function AnimatedHeading({ as: Tag = "h2", parts, className, start = 0 }: Props) {
  const normalized = parts.map((p) => (typeof p === "string" ? { text: p } : p));
  const label = normalized.map((p) => p.text).join(" ");
  let index = start;

  return (
    <Tag className={className} aria-label={label}>
      {normalized.map((part, pi) =>
        part.text
          .split(/\s+/)
          .filter(Boolean)
          .map((word, wi) => (
            <Fragment key={`${pi}-${wi}`}>
              <span className={`word ${part.className ?? ""}`} aria-hidden>
                <span style={{ "--w": index++ } as CSSProperties}>{word}</span>
              </span>{" "}
            </Fragment>
          )),
      )}
    </Tag>
  );
}

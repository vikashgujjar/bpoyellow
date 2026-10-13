"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useSectionNav } from "./SectionNavigation";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & { to: string };

/** In-page link that moves to another full-screen section with the animated transition. */
export default function SectionLink({ to, onClick, ...rest }: Props) {
  const { goTo } = useSectionNav();
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        goTo(to);
      }}
      {...rest}
    />
  );
}

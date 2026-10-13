"use client";

import { useEffect, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import Brand from "@/components/ui/Brand";
import { contact } from "@/lib/content";
import { useSectionNav } from "./SectionNavigation";

const navItems = [
  { to: "services", label: "Services" },
  { to: "industries", label: "Industries" },
  { to: "why-us", label: "Why Us" },
  { to: "insights", label: "Insights" },
  { to: "about", label: "About Us" },
  { to: "contact", label: "Contact" },
];

export default function Header() {
  const { theme, goTo, sections, active, setPaused } = useSectionNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const dark = theme === "black";
  const activeId = sections[active].id;

  // Section navigation is paused while the mobile menu covers the page.
  useEffect(() => {
    setPaused(menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setPaused]);

  const navigate = (to: string) => {
    setMenuOpen(false);
    goTo(to);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 delay-[380ms] ${
        dark ? "text-white" : "text-ink"
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("hero");
          }}
          aria-label="BPO Call Center home"
          className="rounded-lg"
        >
          <Brand onDark={dark} />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <a
                  href={`#${item.to}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.to);
                  }}
                  aria-current={activeId === item.to ? "true" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[0.94rem] font-semibold transition-colors ${
                    activeId === item.to
                      ? dark
                        ? "bg-white/15"
                        : "bg-ink/10"
                      : dark
                        ? "hover:bg-white/10"
                        : "hover:bg-ink/5"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${contact.email}`}
            className="hidden items-center gap-2 px-3 text-sm font-semibold xl:inline-flex"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {contact.email}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              navigate("contact");
            }}
            className={`hidden rounded-full px-5 py-2.5 text-[0.94rem] font-bold transition-colors sm:inline-flex ${
              dark ? "bg-brand text-ink hover:bg-white" : "bg-ink text-white hover:bg-ink/85"
            }`}
          >
            Book a Call Now
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${
              dark ? "bg-white/10" : "bg-ink/10"
            }`}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-nav-ignore
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-brand px-4 pb-8 text-ink sm:px-8"
        >
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Brand />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              autoFocus
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <ul className="mt-6 flex flex-col gap-1">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => navigate(s.id)}
                  className="flex w-full items-baseline gap-4 rounded-2xl px-3 py-3 text-left text-3xl font-extrabold tracking-tight hover:bg-ink/5"
                >
                  <span className="w-8 text-sm font-bold opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 font-semibold"
            >
              <Mail className="h-4 w-4" aria-hidden /> {contact.email}
            </a>
            <button
              type="button"
              onClick={() => navigate("contact")}
              className="rounded-full bg-ink px-6 py-4 text-lg font-bold text-white"
            >
              Book a Call Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

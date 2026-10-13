import Brand from "@/components/ui/Brand";
import SectionLink from "./SectionLink";
import { brand, industries, services } from "@/lib/content";

const linkClass = "text-base text-white/70 transition-colors hover:text-brand";
const headingClass = "text-base font-extrabold text-white";

const companyLinks = [
  { to: "about", label: "About Us" },
  { to: "why-us", label: "Why Us" },
  { to: "insights", label: "Insights" },
  { to: "contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-8 text-white md:border-t md:border-white/12 md:pt-8 lg:mt-10">
      <div className="hidden gap-8 md:grid md:grid-cols-[1.1fr_0.8fr_1fr_1.6fr]">
        <div>
          <Brand onDark />
          <p className="mt-3 max-w-[16rem] text-base text-white/70">{brand.tagline}</p>
        </div>

        <nav aria-label="Company">
          <h3 className={headingClass}>Company</h3>
          <ul className="mt-3 space-y-2">
            {companyLinks.map((link) => (
              <li key={link.to}>
                <SectionLink to={link.to} className={linkClass}>
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h3 className={headingClass}>Services</h3>
          <ul className="mt-3 space-y-2">
            {services.map((s) => (
              <li key={s.id}>
                <SectionLink to="services" className={linkClass}>
                  {s.title}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Industries">
          <h3 className={headingClass}>Industries</h3>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {industries.map((industry) => (
              <li key={industry.id}>
                <SectionLink to="industries" className={linkClass}>
                  {industry.title}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/12 pt-5 text-sm text-white/60 md:mt-8 md:flex-row md:items-center md:justify-between">
        <p>© 2026 {brand.name}. All rights reserved.</p>
        <ul className="flex gap-5">
          {/* Placeholder legal pages — point these at real pages when they exist. */}
          {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((label) => (
            <li key={label}>
              <a href="#" className="hover:text-brand">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

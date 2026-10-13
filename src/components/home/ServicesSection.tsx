import { ArrowRight, FileStack, Headset, MonitorCog, type LucideIcon } from "lucide-react";
import Container, { Eyebrow, delay } from "@/components/ui/Container";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import SectionLink from "@/components/layout/SectionLink";
import { services } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "contact-center": Headset,
  "it-support": MonitorCog,
  "back-office": FileStack,
};

export default function ServicesSection() {
  return (
    <Container>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow className="reveal text-brand">Our Services</Eyebrow>
          <AnimatedHeading
            parts={["Flexible teams for every", { text: "core function", className: "text-brand" }]}
            start={1}
            className="mt-4 max-w-3xl text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:mt-5 sm:text-6xl"
          />
        </div>
        <SectionLink
          to="contact"
          className="reveal-right hidden w-fit items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-ink hover:bg-white md:inline-flex"
          style={delay(3)}
        >
          Book a Call Now <ArrowRight className="h-4 w-4" aria-hidden />
        </SectionLink>
      </div>

      <ul className="mt-7 grid gap-3 md:mt-10 md:grid-cols-3 lg:mt-12 lg:gap-5">
        {services.map((service, i) => {
          const Icon = icons[service.id];
          return (
            <li
              key={service.id}
              className="reveal-scale group flex gap-4 rounded-[1.5rem] border border-white/12 bg-ink-soft p-5 hover:border-brand hover:bg-brand hover:text-ink md:flex-col md:gap-0 md:rounded-[1.75rem] md:p-7 lg:min-h-[300px] lg:p-8"
              style={delay(3 + i)}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-ink transition-colors group-hover:bg-ink group-hover:text-brand md:h-14 md:w-14 md:rounded-2xl">
                  <Icon className="h-5 w-5 md:h-7 md:w-7" aria-hidden />
                </span>
                <span className="hidden text-sm font-extrabold tabular-nums opacity-50 md:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="md:mt-auto">
                <h3 className="text-lg font-extrabold tracking-tight md:mt-8 md:text-2xl lg:text-[1.7rem]">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed opacity-75 md:mt-3 md:text-[0.98rem]">
                  {service.body}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

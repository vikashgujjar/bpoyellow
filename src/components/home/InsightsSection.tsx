import { ArrowRight } from "lucide-react";
import Container, { Eyebrow, delay } from "@/components/ui/Container";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { brand, contact, insights } from "@/lib/content";

/** Typographic magazine cover for the insights publication. */
function MagazineCover() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] short:max-w-[290px]" aria-hidden>
      <div className="absolute inset-0 translate-x-5 translate-y-4 rotate-[7deg] rounded-[1.5rem] bg-white/10" />
      <div className="absolute inset-0 -rotate-[4deg] overflow-hidden rounded-[1.5rem] bg-brand p-6 text-ink shadow-2xl">
        <div className="flex items-center justify-between text-[0.65rem] font-extrabold uppercase tracking-[0.2em]">
          <span>{brand.name}</span>
          <span>Issue 01</span>
        </div>
        <p className="mt-6 text-[3.3rem] font-extrabold uppercase leading-[0.85] tracking-[-0.04em]">
          The CX
          <br />
          Journal
        </p>
        <span className="mt-5 inline-block rounded-full bg-ink px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-brand">
          This month
        </span>
        <ul className="absolute inset-x-6 bottom-6 space-y-2 border-t-2 border-ink pt-4 text-sm font-bold">
          <li>Scaling support without losing the human touch</li>
          <li>Five metrics every CX leader should track</li>
        </ul>
      </div>
    </div>
  );
}

export default function InsightsSection() {
  return (
    <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div>
        <Eyebrow className="reveal text-brand">Insights</Eyebrow>
        <AnimatedHeading
          parts={["The CX", { text: "Journal", className: "text-brand" }]}
          start={1}
          className="mt-4 text-[3.6rem] font-extrabold uppercase leading-[0.88] tracking-[-0.045em] sm:mt-5 sm:text-8xl"
        />
        <p className="reveal mt-5 text-xl font-extrabold tracking-tight sm:mt-6 sm:text-2xl" style={delay(3)}>
          {insights.subtitle}
        </p>
        <p
          className="reveal mt-3 max-w-xl text-base font-medium leading-relaxed text-white/70 sm:mt-4 sm:text-lg"
          style={delay(4)}
        >
          {insights.body}
        </p>
        <a
          href={`mailto:${contact.email}?subject=Subscribe%20to%20The%20CX%20Journal`}
          className="reveal mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-ink hover:bg-white sm:mt-8 sm:px-7 sm:py-4"
          style={delay(5)}
        >
          Subscribe for Updates <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
      <div className="reveal-tilt hidden lg:block" style={delay(2)}>
        <MagazineCover />
      </div>
    </Container>
  );
}

import { ArrowRight, Gauge, HandHeart, PiggyBank, UserCheck, type LucideIcon } from "lucide-react";
import Container, { Eyebrow, delay } from "@/components/ui/Container";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import SectionLink from "@/components/layout/SectionLink";
import { whyChooseUs } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  experts: UserCheck,
  tailored: HandHeart,
  value: PiggyBank,
  speed: Gauge,
};

export default function WhyChooseUsSection() {
  return (
    <Container className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
      <div>
        <Eyebrow className="reveal">Why Us</Eyebrow>
        <AnimatedHeading
          parts={["Why Choose Us"]}
          start={1}
          className="mt-4 text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.035em] sm:mt-5 sm:text-7xl"
        />
        <SectionLink
          to="contact"
          className="reveal mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-bold text-white hover:bg-ink/85 sm:mt-8 sm:px-7 sm:py-4"
          style={delay(3)}
        >
          Book a Free Consultation <ArrowRight className="h-4 w-4" aria-hidden />
        </SectionLink>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4">
        {whyChooseUs.map((item, i) => {
          const Icon = icons[item.id];
          return (
            <li
              key={item.id}
              className={`${i % 2 ? "reveal-right" : "reveal-left"} rounded-[1.25rem] border-[3px] border-ink bg-brand p-4 shadow-[4px_4px_0_0_#0b0b0b] sm:rounded-[1.75rem] sm:p-7 sm:shadow-[6px_6px_0_0_#0b0b0b]`}
              style={delay(3 + i)}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-brand sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
              </span>
              <h3 className="mt-3 text-[0.98rem] font-extrabold leading-tight tracking-tight sm:mt-6 sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink/75 sm:mt-2 sm:text-base">
                {item.body}
              </p>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

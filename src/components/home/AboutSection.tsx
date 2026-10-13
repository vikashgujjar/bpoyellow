import { Cpu, Users, Workflow, type LucideIcon } from "lucide-react";
import Container, { Eyebrow, delay } from "@/components/ui/Container";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { about } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  people: Users,
  process: Workflow,
  technology: Cpu,
};

export default function AboutSection() {
  return (
    <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div>
        <Eyebrow className="reveal">About Us</Eyebrow>
        <AnimatedHeading
          parts={[about.title]}
          start={1}
          className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:mt-5 sm:text-6xl"
        />
        <p
          className="reveal mt-5 max-w-lg text-base font-medium leading-relaxed text-ink/75 sm:mt-6 sm:text-lg"
          style={delay(4)}
        >
          {about.body}
        </p>
      </div>

      <ul className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-2">
        {about.pillars.map((pillar, i) => {
          const Icon = icons[pillar.id];
          return (
            <li
              key={pillar.id}
              className={`reveal-scale flex flex-col rounded-[1.5rem] border-[3px] border-ink p-4 shadow-[6px_6px_0_0_#0b0b0b] sm:p-6 ${
                i === 0 ? "bg-brand lg:row-span-2 lg:justify-end" : i === 1 ? "bg-ink text-white" : "bg-white"
              }`}
              style={delay(4 + i)}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-full sm:h-12 sm:w-12 ${
                  i === 1 ? "bg-brand text-ink" : "bg-ink text-brand"
                } ${i === 0 ? "lg:mb-auto" : ""}`}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-extrabold tracking-tight sm:mt-6 sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-1 text-xs font-medium opacity-75 sm:text-base">{pillar.body}</p>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

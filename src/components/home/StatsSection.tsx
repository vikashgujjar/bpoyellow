import Container, { Eyebrow, delay } from "@/components/ui/Container";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import CountUp from "@/components/ui/CountUp";
import { stats } from "@/lib/content";

export default function StatsSection() {
  return (
    <Container>
      <Eyebrow className="reveal">By the numbers</Eyebrow>
      <AnimatedHeading
        parts={[stats.title]}
        start={1}
        className="mt-4 max-w-4xl text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:mt-5 sm:text-6xl xl:text-7xl"
      />

      <dl className="mt-10 grid grid-cols-2 border-t-[3px] border-ink lg:mt-16 lg:grid-cols-4">
        {stats.items.map((stat, i) => (
          <div
            key={stat.label}
            className={`reveal flex flex-col-reverse gap-2 border-ink py-6 pr-4 sm:py-9 ${
              i % 2 === 1 ? "border-l-[3px] pl-5 sm:pl-8" : ""
            } ${i > 1 ? "border-t-[3px] lg:border-t-0" : ""} ${
              i === 2 ? "lg:border-l-[3px] lg:pl-8" : ""
            }`}
            style={delay(4 + i)}
          >
            <dt className="text-xs font-bold uppercase tracking-wider text-ink/70 sm:text-base">
              {stat.label}
            </dt>
            <dd className="text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] sm:text-6xl xl:text-7xl">
              <CountUp value={stat.value} sectionId="stats" />
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

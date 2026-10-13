import { ArrowRight, CheckCircle2, Headset } from "lucide-react";
import Container, { Eyebrow, delay } from "@/components/ui/Container";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import SectionLink from "@/components/layout/SectionLink";
import { hero } from "@/lib/content";

function RotatingBadge() {
  return (
    <div className="absolute -bottom-16 -left-16 h-32 w-32" aria-hidden>
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full motion-safe:animate-[spin_18s_linear_infinite]"
      >
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-ink text-[11px] font-extrabold uppercase tracking-[0.32em]">
          <textPath href="#badge-circle">24/7 Support • Scale • Grow •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-brand">
        <ArrowRight className="h-6 w-6 -rotate-45" />
      </span>
    </div>
  );
}

const bars = [38, 52, 46, 70, 64, 86, 78];

/** Illustrative support-desk card (sample figures). */
function SupportDeskCard() {
  return (
    <div className="rotate-[2deg] rounded-[2rem] border-[3px] border-ink bg-white p-6 shadow-[10px_10px_0_0_#0b0b0b] short:p-5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand">
            <Headset className="h-5 w-5" aria-hidden />
          </span>
          Live Support Desk
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
          Online
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 short:mt-4">
        {[
          ["1,284", "Calls today"],
          ["28s", "Avg. response"],
          ["96%", "CSAT"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-cream p-3">
            <p className="text-2xl font-extrabold tracking-tight">{value}</p>
            <p className="mt-0.5 text-xs font-semibold text-ink/60">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex h-28 items-end gap-2 short:mt-4 short:h-20">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-lg ${i === bars.length - 2 ? "bg-ink" : "bg-brand"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.65rem] font-bold uppercase tracking-wider text-ink/45">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d} className="flex-1 text-center">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div>
        <Eyebrow className="reveal">{hero.eyebrow}</Eyebrow>
        <AnimatedHeading
          as="h1"
          parts={[hero.title]}
          start={1}
          className="mt-5 text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-7xl xl:text-[5.3rem] short:text-[4.2rem]"
        />
        <p
          className="reveal mt-5 max-w-xl text-base font-medium leading-relaxed text-ink/80 sm:mt-6 sm:text-xl short:mt-4 short:text-lg"
          style={delay(3)}
        >
          {hero.body}
        </p>
        <div className="reveal mt-7 flex flex-wrap gap-3 sm:mt-8 short:mt-6" style={delay(4)}>
          <SectionLink
            to="contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-bold text-white transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-4"
          >
            Let&apos;s Connect <ArrowRight className="h-4 w-4" aria-hidden />
          </SectionLink>
          <SectionLink
            to="services"
            className="inline-flex items-center rounded-full border-2 border-ink px-6 py-3 text-base font-bold transition-colors hover:bg-ink/5 sm:px-7 sm:py-3.5"
          >
            Explore Services
          </SectionLink>
        </div>

        <ul
          className="reveal mt-8 flex flex-col gap-2 sm:mt-10 sm:flex-row sm:gap-3 short:mt-6"
          style={delay(5)}
        >
          {hero.badges.map((badge) => (
            <li
              key={badge}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-ink/8 px-4 py-2 text-sm font-bold"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden /> {badge}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="reveal-tilt relative mx-auto hidden w-full max-w-md lg:block"
        style={delay(2)}
        aria-hidden
      >
        <SupportDeskCard />
        <RotatingBadge />
      </div>
    </Container>
  );
}

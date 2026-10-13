import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import Container, { Eyebrow, delay } from "@/components/ui/Container";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Footer from "@/components/layout/Footer";
import { contact, offices } from "@/lib/content";

const channels = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
  { icon: Smartphone, label: "Mobile", value: contact.mobile, href: contact.mobileHref },
];

export default function ContactSection() {
  return (
    <Container>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow className="reveal text-brand">Contact Us</Eyebrow>
          <AnimatedHeading
            parts={["Book a", { text: "Call", className: "text-brand" }, "Now"]}
            start={1}
            className="mt-4 whitespace-nowrap text-[min(10.5vw,4.5rem)] font-extrabold leading-none tracking-[-0.035em] sm:mt-5"
          />
        </div>
        <p
          className="reveal max-w-sm text-base font-medium leading-relaxed text-white/70 lg:pb-2 lg:text-right"
          style={delay(3)}
        >
          Tell us what you need and we&apos;ll get back to you within one business day.
        </p>
      </div>

      <div className="mt-7 grid gap-3 lg:mt-10">
        <ul className="grid gap-2.5 lg:grid-cols-3 lg:gap-3">
          {channels.map(({ icon: Icon, label, value, href }, i) => (
            <li key={label} className="reveal-left" style={delay(3 + i)}>
              <a
                href={href}
                className={`flex h-full items-center gap-4 rounded-2xl px-5 py-3.5 ${
                  i === 0
                    ? "bg-brand text-ink hover:bg-white"
                    : "border-2 border-white/15 text-white hover:border-brand"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                <span className="w-14 text-sm font-semibold opacity-70">{label}</span>
                <span className="text-base font-bold">{value}</span>
              </a>
            </li>
          ))}
        </ul>

        <ul className="grid gap-2.5 lg:grid-cols-3 lg:gap-3">
          {offices.map((office, i) => (
            <li
              key={office.region}
              className="reveal-right flex gap-4 rounded-2xl border-2 border-white/15 px-5 py-3.5"
              style={delay(3 + i)}
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand">
                  {office.region}
                </h3>
                <address className="mt-0.5 text-base not-italic text-white/80">{office.address}</address>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal" style={delay(6)}>
        <Footer />
      </div>
    </Container>
  );
}

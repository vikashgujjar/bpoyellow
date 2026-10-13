import Container, { Eyebrow, delay } from "@/components/ui/Container";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { industries } from "@/lib/content";
import IndustriesCarousel from "./IndustriesCarousel";

export default function IndustriesSection() {
  return (
    <Container>
      <Eyebrow className="reveal text-brand">Industries</Eyebrow>
      <AnimatedHeading
        parts={["Our Industry", { text: "Reach", className: "text-brand" }]}
        start={1}
        className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:mt-5 sm:text-6xl"
      />
      <div className="reveal-scale mt-7 lg:mt-12" style={delay(3)}>
        <IndustriesCarousel industries={industries} />
      </div>
    </Container>
  );
}

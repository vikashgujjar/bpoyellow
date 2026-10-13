import { Quote } from "lucide-react";
import Container, { Eyebrow, delay } from "@/components/ui/Container";
import { testimonial } from "@/lib/content";

export default function TestimonialsSection() {
  return (
    <Container className="max-w-[1100px]">
      <Eyebrow className="reveal">Testimonials</Eyebrow>
      <figure className="mt-6 sm:mt-8">
        <Quote
          className="reveal-tilt h-12 w-12 fill-brand text-ink sm:h-20 sm:w-20"
          strokeWidth={1.5}
          style={delay(1)}
          aria-hidden
        />
        <blockquote
          className="reveal mt-5 text-xl font-bold leading-[1.4] tracking-[-0.01em] sm:mt-6 sm:text-4xl sm:leading-[1.3]"
          style={delay(2)}
        >
          “{testimonial.quote}”
        </blockquote>
        <figcaption className="reveal-left mt-6 flex items-center gap-4 sm:mt-8" style={delay(4)}>
          <span className="h-[3px] w-12 bg-ink" aria-hidden />
          <span className="text-sm font-extrabold sm:text-lg">{testimonial.author}</span>
        </figcaption>
      </figure>
    </Container>
  );
}

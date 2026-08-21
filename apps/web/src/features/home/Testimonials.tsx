import { Quote } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { testimonials } from '../../data/testimonials';

/** Home testimonials — client quotes as social proof. */
export function Testimonials() {
  return (
    <Section eyebrow="Testimonials" title="What our clients say">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.05}>
            <figure className="flex h-full flex-col rounded-lg border border-ats-text/10 bg-ats-bg-light p-6 transition-all duration-300 motion-safe:hover:shadow-lg dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-ats-accent/10 text-ats-accent">
                <Quote className="h-5 w-5" aria-hidden />
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="block text-ats-text-muted">{testimonial.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

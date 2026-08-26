import { Quote } from 'lucide-react';
import { Section } from '../../components/Section';
import { Reveal } from '../../components/motion/Reveal';
import { Stagger } from '../../components/motion/Stagger';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { testimonials } from '../../data/testimonials';

/**
 * Home testimonials, client quotes as social proof.
 *
 * Shows a "coming soon" panel until data/testimonials.ts has approved
 * quotes to display.
 */
export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <Section
      eyebrow="Testimonials"
      title="What our"
      titleAccent="clients say"
      tone="raised"
      description="Quotes are published only once a client has approved them, so this space stays honest while our first case studies clear review."
    >
      {featured ? (
        <Stagger className="grid gap-5 lg:grid-cols-3">
          <Reveal asChild as="div" className="h-full lg:col-span-2">
            <SpotlightCard
              as="figure"
              className="ast-ring-gradient flex h-full flex-col justify-between rounded-4xl border border-ast-line bg-ast-surface/70 p-8 sm:p-11"
            >
              <Quote
                className="h-9 w-9 shrink-0 text-ast-accent/50"
                strokeWidth={1.5}
                aria-hidden
              />
              <blockquote className="mt-8 text-balance text-2xl font-medium leading-snug tracking-tighter2 sm:text-3xl">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-ast-line pt-6 text-sm">
                <span className="font-semibold">{featured.name}</span>
                <span className="text-ast-ink-muted">{featured.role}</span>
              </figcaption>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-5 lg:col-span-1">
            {rest.map((testimonial, index) => (
              <Reveal key={`${testimonial.name}-${index}`} asChild as="div" className="h-full">
                <SpotlightCard
                  as="figure"
                  className="flex h-full flex-col justify-between rounded-4xl border border-ast-line bg-ast-surface/50 p-7"
                >
                  <Quote
                    className="h-6 w-6 shrink-0 text-ast-accent/40"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <blockquote className="mt-5 text-sm leading-relaxed text-ast-ink">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="block font-semibold">{testimonial.name}</span>
                    <span className="mt-0.5 block text-xs text-ast-ink-muted">
                      {testimonial.role}
                    </span>
                  </figcaption>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Stagger>
      ) : (
        <Reveal>
          <div className="ast-ring-gradient relative overflow-hidden rounded-4xl border border-dashed border-ast-line bg-ast-surface/50 px-8 py-16 text-center">
            <Quote className="mx-auto h-8 w-8 text-ast-accent/50" strokeWidth={1.5} aria-hidden />
            <p className="mt-5 text-xl font-semibold tracking-tighter2">
              Client testimonials coming soon.
            </p>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-ast-ink-muted">
              We&apos;re early. Quotes will appear here once our first clients have signed off on
              them.
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

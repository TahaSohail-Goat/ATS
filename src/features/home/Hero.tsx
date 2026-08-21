import Link from 'next/link';
import { ArrowUpRight, MoveDown } from 'lucide-react';
import { Button } from '@ats/ui';
import { Container } from '../../components/Container';
import { Aurora } from '../../components/Aurora';
import { Reveal } from '../../components/motion/Reveal';
import { RevealText } from '../../components/motion/RevealText';
import { Magnetic } from '../../components/motion/Magnetic';
import { Marquee } from '../../components/motion/Marquee';
import { Counter } from '../../components/motion/Counter';
import { capabilities, processSteps, techStack } from '../../data/site';
import { services } from '../../data/services';

/**
 * Home hero — brand promise, primary CTA (Start a Project), secondary CTA
 * (View Our Work).
 *
 * The figures in the strip are counted from site data rather than asserted:
 * practice areas, delivery stages, and stack breadth are all verifiable from
 * the content itself. No performance or client claims are made here — see
 * docs/product/vision.md.
 */
const FACTS = [
  { value: services.length, label: 'Practice areas', suffix: '' },
  { value: processSteps.length, label: 'Stage delivery process', suffix: '' },
  { value: techStack.length, label: 'Core technologies', suffix: '+' },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Aurora variant="hero" />

      <Container className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal direction="none">
            <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-ats-line bg-ats-surface/60 px-4 py-2 text-eyebrow font-semibold uppercase text-ats-accent backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5 items-center justify-center" aria-hidden>
                <span className="absolute h-1.5 w-1.5 rounded-full bg-ats-accent motion-safe:animate-ats-pulse-ring" />
                <span className="h-1.5 w-1.5 rounded-full bg-ats-accent" />
              </span>
              AI Software &amp; Technology Solutions
            </p>
          </Reveal>

          <RevealText
            as="h1"
            immediate
            className="text-display-xl font-semibold"
            parts={[
              { text: 'We build software that' },
              { text: 'moves businesses forward', gradient: true },
            ]}
          />

          <Reveal delay={0.35}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ats-ink-muted sm:text-xl">
              ATS designs and ships custom software, AI features, and cloud infrastructure for
              companies that outgrow templates — clean architecture, measurable results, and a team
              you can actually reach.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Magnetic strength={12} className="w-full sm:w-auto">
                <Button asChild size="xl" fullWidth className="sm:w-auto">
                  <Link href="/contact">
                    Start a Project
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild size="xl" variant="outline" fullWidth className="sm:w-auto">
                <Link href="/projects">View Our Work</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Verifiable facts, counted from site data. */}
        <Reveal delay={0.6} className="mt-20">
          <dl className="mx-auto grid max-w-3xl grid-cols-1 divide-y divide-ats-line border-y border-ats-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {FACTS.map((fact) => (
              <div key={fact.label} className="px-6 py-6 text-center">
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <Counter
                    value={fact.value}
                    suffix={fact.suffix}
                    className="block bg-ats-brand-gradient bg-clip-text text-4xl font-semibold tracking-display text-transparent sm:text-5xl"
                  />
                  <span className="mt-2 block text-xs font-medium uppercase tracking-[0.16em] text-ats-ink-muted">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal
          delay={0.7}
          className="mt-12 hidden items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ats-ink-muted sm:flex"
        >
          <MoveDown className="h-3.5 w-3.5 motion-safe:animate-ats-scroll-hint" aria-hidden />
          Scroll to explore
        </Reveal>
      </Container>

      {/* Capability marquee closes the hero and bridges into the page. */}
      <div className="relative border-y border-ats-line bg-ats-surface/40 py-5">
        <Marquee speed={46} aria-label="ATS capabilities">
          {capabilities.map((capability) => (
            <span key={capability} className="flex items-center gap-8 px-8">
              <span className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.16em] text-ats-ink-muted">
                {capability}
              </span>
              <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-ats-accent/60" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

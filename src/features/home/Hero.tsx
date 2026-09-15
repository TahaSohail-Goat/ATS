import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveDown } from 'lucide-react';
import { Button } from '@ast/ui';
import { Container } from '../../components/Container';
import { Reveal } from '../../components/motion/Reveal';
import { RevealText } from '../../components/motion/RevealText';
import { CyclingWord } from '../../components/motion/CyclingWord';
import { Magnetic } from '../../components/motion/Magnetic';
import { Counter } from '../../components/motion/Counter';
import { processSteps, techStack } from '../../data/site';
import { services } from '../../data/services';

const FACTS = [
  { value: services.length, label: 'Practice areas', suffix: '' },
  { value: processSteps.length, label: 'Stage delivery process', suffix: '' },
  { value: techStack.length, label: 'Core technologies', suffix: '+' },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-bleed photo hero: real engineers, not a gradient blob. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-[center_30%]"
        style={{ backgroundImage: "url('/stock/hero-team.jpg')" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ast-primary/50 via-ast-primary/80 to-ast-primary"
      />

      <Container className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal direction="none">
            <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-4 py-2 text-eyebrow font-semibold uppercase text-ast-accent-on-dark">
              <span className="relative flex h-1.5 w-1.5 items-center justify-center" aria-hidden>
                <span className="absolute h-1.5 w-1.5 rounded-full bg-ast-accent-on-dark motion-safe:animate-ast-pulse-ring" />
                <span className="h-1.5 w-1.5 rounded-full bg-ast-accent-on-dark" />
              </span>
              AI Software &amp; Technology Solutions
            </p>
          </Reveal>

          <h1 className="text-display-xl font-semibold text-ast-on-dark">
            <RevealText
              as="span"
              immediate
              className="block"
              parts={[{ text: 'We build software that' }]}
            />
            <Reveal as="span" immediate delay={0.1} className="mt-2 block">
              moves{' '}
              <CyclingWord
                words={['businesses', 'startups', 'products', 'ideas', 'teams']}
                className="text-ast-accent-on-dark"
              />{' '}
              forward
            </Reveal>
          </h1>

          <Reveal delay={0.35}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ast-on-dark-muted sm:text-xl">
              AST designs and ships custom software, AI features, and cloud infrastructure for
              companies that outgrow templates: clean architecture, measurable results, and a team
              you can actually reach.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Magnetic strength={12} className="w-full sm:w-auto">
                <Button asChild size="xl" fullWidth className="sm:w-auto">
                  <Link to="/contact">
                    Start a Project
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
              </Magnetic>
              <Button
                asChild
                size="xl"
                variant="outline"
                fullWidth
                className="!border-white/25 !bg-white/5 !text-ast-on-dark !backdrop-blur-none hover:!border-white/45 hover:!bg-white/10 sm:w-auto"
              >
                <Link to="/projects">View Our Work</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Verifiable facts, counted from site data. */}
        <Reveal delay={0.6} className="mt-20">
          <dl className="mx-auto grid max-w-3xl grid-cols-1 divide-y divide-white/15 border-y border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {FACTS.map((fact) => (
              <div key={fact.label} className="px-6 py-6 text-center">
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <Counter
                    value={fact.value}
                    suffix={fact.suffix}
                    className="block text-4xl font-semibold tracking-display text-ast-accent-on-dark sm:text-5xl"
                  />
                  <span className="mt-2 block text-xs font-medium uppercase tracking-[0.16em] text-ast-on-dark-muted">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal
          delay={0.7}
          className="mt-12 hidden items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ast-on-dark-muted sm:flex"
        >
          <MoveDown className="h-3.5 w-3.5 motion-safe:animate-ast-scroll-hint" aria-hidden />
          Scroll to explore
        </Reveal>
      </Container>
    </section>
  );
}

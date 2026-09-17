import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveDown } from 'lucide-react';
import { Button } from '@ast/ui';
import { Container } from '../../components/Container';
import { Reveal } from '../../components/motion/Reveal';
import { RevealText } from '../../components/motion/RevealText';
import { CyclingWord } from '../../components/motion/CyclingWord';
import { Magnetic } from '../../components/motion/Magnetic';

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
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ast-canvas/50 via-ast-canvas/80 to-ast-canvas"
      />

      <Container className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-display-xl font-semibold text-ast-ink">
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
                className="text-ast-accent"
              />{' '}
              forward
            </Reveal>
          </h1>

          <Reveal delay={0.35}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ast-ink-muted sm:text-xl">
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
                className="!border-ast-ink/25 !bg-ast-ink/5 !text-ast-ink !backdrop-blur-none hover:!border-ast-ink/45 hover:!bg-ast-ink/10 sm:w-auto"
              >
                <Link to="/projects">View Our Work</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.6}
          className="mt-16 hidden items-center justify-center gap-2 text-xs font-medium text-ast-ink-muted sm:flex"
        >
          <MoveDown className="h-3.5 w-3.5 motion-safe:animate-ast-scroll-hint" aria-hidden />
          Scroll to explore
        </Reveal>
      </Container>
    </section>
  );
}

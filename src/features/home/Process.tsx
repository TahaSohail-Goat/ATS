import { Container } from '../../components/Container';
import { ArrowLink } from '../../components/ArrowLink';
import { ProcessTimeline } from '../../components/ProcessTimeline';
import { Reveal } from '../../components/motion/Reveal';
import { processSteps } from '../../data/site';

/**
 * Home "How we work", the engagement process, step by step. A full-bleed
 * photo band (always-dark, like the header/hero/footer/CTA) rather than
 * a plain section, so the process reads as real work, not a diagram.
 */
export function Process() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-20 sm:py-28"
      style={{ backgroundImage: "url('/stock/process-planning.jpg')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-ast-primary/90" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal direction="none">
              <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ast-accent-on-dark">
                <span aria-hidden className="h-1 w-1 rounded-full bg-ast-accent-on-dark" />
                How we work
              </p>
            </Reveal>

            <Reveal as="h2" className="text-display-md font-semibold text-ast-on-dark">
              A process that keeps <span className="text-ast-accent-on-dark">you in control</span>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ast-on-dark-muted">
                Short cycles, visible progress, and decisions you can make with confidence.
              </p>
            </Reveal>

            <div className="mt-8">
              <ArrowLink href="/contact" className="!text-ast-accent-on-dark hover:!text-white">
                Talk through your project
              </ArrowLink>
            </div>
          </div>

          <ProcessTimeline steps={processSteps} onDark />
        </div>
      </Container>
    </section>
  );
}

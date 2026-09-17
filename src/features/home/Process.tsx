import { Container } from '../../components/Container';
import { ArrowLink } from '../../components/ArrowLink';
import { ProcessTimeline } from '../../components/ProcessTimeline';
import { Reveal } from '../../components/motion/Reveal';
import { processSteps } from '../../data/site';

/**
 * Home "How we work", the engagement process, step by step. A full-bleed
 * photo band (like the header/hero/footer/CTA) rather than a plain
 * section, so the process reads as real work, not a diagram.
 */
export function Process() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-20 sm:py-28"
      style={{ backgroundImage: "url('/stock/process-planning.jpg')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-ast-canvas/60 dark:bg-ast-canvas/90" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal as="h2" direction="none" className="ast-photo-text text-display-md font-semibold text-ast-ink">
              A process that keeps <span className="text-ast-accent">you in control</span>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="ast-photo-text mt-6 max-w-prose text-lg leading-relaxed text-ast-ink-muted">
                Short cycles, visible progress, and decisions you can make with confidence.
              </p>
            </Reveal>

            <div className="mt-8">
              <ArrowLink href="/contact" className="!text-ast-accent hover:!text-ast-ink">
                Talk through your project
              </ArrowLink>
            </div>
          </div>

          <ProcessTimeline steps={processSteps} />
        </div>
      </Container>
    </section>
  );
}

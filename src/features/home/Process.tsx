import { Container } from '../../components/Container';
import { SectionHeading } from '../../components/SectionHeading';
import { ArrowLink } from '../../components/ArrowLink';
import { ProcessTimeline } from '../../components/ProcessTimeline';
import { processSteps } from '../../data/site';

/**
 * Home "How we work", the engagement process, step by step.
 *
 * Custom two-column layout rather than `Section`: the heading pins while the
 * timeline scrolls past it, which is the point of the section.
 */
export function Process() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="ast-dots pointer-events-none absolute inset-0 opacity-40" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title="A process that keeps"
              titleAccent="you in control"
              description="Short cycles, visible progress, and decisions you can make with confidence."
            />
            <div className="mt-8">
              <ArrowLink href="/contact">Talk through your project</ArrowLink>
            </div>
          </div>

          <ProcessTimeline steps={processSteps} />
        </div>
      </Container>
    </section>
  );
}

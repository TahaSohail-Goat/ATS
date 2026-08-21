import type { ProcessStep } from '../data/site';
import { Reveal } from './motion/Reveal';

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

/**
 * Vertical process timeline. The rail is intentionally static: a
 * scroll-linked spring here added a second page-level scroll observer without
 * improving comprehension. Reveal still gives each step a light entrance.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="relative pl-12 sm:pl-16">
      <span
        aria-hidden
        className="absolute bottom-2 left-[1.1875rem] top-2 w-px bg-ats-brand-gradient sm:left-[1.6875rem]"
      />

      {steps.map((step, index) => (
        <Reveal key={step.title} as="li" delay={index * 0.04} className="relative pb-12 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ats-line bg-ats-surface font-mono text-sm font-semibold text-ats-accent sm:-left-16"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl font-semibold tracking-tighter2 sm:text-2xl">{step.title}</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-ats-ink-muted">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}

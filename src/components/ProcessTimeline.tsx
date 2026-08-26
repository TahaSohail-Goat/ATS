import type { ProcessStep } from '../data/site';
import { Reveal } from './motion/Reveal';

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

/**
 * Vertical process timeline with glowing numbers and clean step progression.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="relative pl-12 sm:pl-16">
      {/* Vertical timeline line */}
      <span
        aria-hidden
        className="absolute bottom-4 left-[1.1875rem] top-3 w-0.5 bg-gradient-to-b from-ast-brand via-ast-accent to-ast-line sm:left-[1.6875rem]"
      />

      {steps.map((step, index) => (
        <Reveal key={step.title} as="li" delay={index * 0.05} className="group relative pb-12 last:pb-0">
          {/* Step Number Badge */}
          <span
            aria-hidden
            className="absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ast-line bg-ast-surface font-mono text-sm font-semibold text-ast-accent shadow-sm transition-all duration-300 group-hover:border-ast-brand/50 group-hover:bg-ast-surface-raised group-hover:shadow-[0_0_16px_rgb(var(--ast-brand)/0.25)] sm:-left-16"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Step Content */}
          <div className="rounded-2xl border border-transparent p-4 transition-colors duration-300 group-hover:border-ast-line/50 group-hover:bg-ast-surface/30">
            <h3 className="text-xl font-semibold tracking-tighter2 text-ast-ink transition-colors group-hover:text-ast-brand sm:text-2xl">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-ast-ink-muted">
              {step.description}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

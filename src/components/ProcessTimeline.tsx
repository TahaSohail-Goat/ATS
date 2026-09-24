import type { ProcessStep } from '../data/site';
import { Reveal } from './motion/Reveal';

const logoMark = '/brand/ast-logo.jpeg';

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

/**
 * Vertical process timeline. Each step is marked by the AST logo mark
 * rather than a plain number, so the brand carries through the whole
 * scroll instead of a bare "01, 02, 03…" list. Sits on the always-photo
 * process band, so its accent styling favors a bit more contrast than a
 * plain themed surface would.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="relative pl-12 sm:pl-16">
      {/* Vertical timeline line */}
      <span
        aria-hidden
        className="absolute bottom-4 left-[1.1875rem] top-3 w-0.5 bg-gradient-to-b from-ast-brand via-ast-accent to-ast-ink/20 sm:left-[1.6875rem]"
      />

      {steps.map((step, index) => (
        <Reveal key={step.title} as="li" delay={index * 0.05} className="group relative pb-12 last:pb-0">
          {/* Step Badge, the AST mark rather than a number */}
          <span
            aria-hidden
            className="absolute -left-12 top-0 flex h-10 w-10 items-center justify-center sm:-left-16 sm:h-11 sm:w-11"
          >
            <span className="absolute inset-0 rounded-full bg-ast-brand/35 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            <img
              src={logoMark}
              alt=""
              width={44}
              height={44}
              className="relative h-full w-full rounded-full border border-ast-ink/25 object-cover shadow-sm transition-all duration-300 group-hover:scale-[1.08] group-hover:border-ast-brand/60 group-hover:shadow-[0_0_16px_rgb(var(--ast-brand)/0.35)]"
            />
          </span>

          {/* Step Content */}
          <div className="ast-photo-text rounded-2xl border border-transparent p-4 transition-colors duration-300 group-hover:border-ast-ink/15 group-hover:bg-ast-ink/5">
            <span className="inline-block rounded-full bg-ast-canvas/85 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-ast-accent">
              Step {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-1 text-xl font-semibold tracking-tighter2 text-ast-ink transition-colors group-hover:text-ast-accent sm:text-2xl">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-ast-ink dark:text-ast-ink-muted">{step.description}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

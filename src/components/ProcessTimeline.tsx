import type { ProcessStep } from '../data/site';
import { Reveal } from './motion/Reveal';

const logoMark = '/brand/ast-logo.jpeg';

interface ProcessTimelineProps {
  steps: ProcessStep[];
  /** Sits on an always-dark photo band (the Home process section) rather than a themed surface. */
  onDark?: boolean;
}

/**
 * Vertical process timeline. Each step is marked by the AST logo mark
 * rather than a plain number, so the brand carries through the whole
 * scroll instead of a bare "01, 02, 03…" list.
 */
export function ProcessTimeline({ steps, onDark = false }: ProcessTimelineProps) {
  const lineColor = onDark ? 'via-ast-accent-on-dark to-white/20' : 'via-ast-accent to-ast-line';
  const badgeBorder = onDark ? 'border-white/25' : 'border-ast-line';
  const stepLabel = onDark ? 'text-ast-accent-on-dark' : 'text-ast-accent';
  const titleColor = onDark
    ? 'text-ast-on-dark group-hover:text-ast-accent-on-dark'
    : 'text-ast-ink group-hover:text-ast-brand';
  const descColor = onDark ? 'text-ast-on-dark-muted' : 'text-ast-ink-muted';
  const hoverPanel = onDark
    ? 'group-hover:border-white/15 group-hover:bg-white/5'
    : 'group-hover:border-ast-line/50 group-hover:bg-ast-surface/30';

  return (
    <ol className="relative pl-12 sm:pl-16">
      {/* Vertical timeline line */}
      <span
        aria-hidden
        className={`absolute bottom-4 left-[1.1875rem] top-3 w-0.5 bg-gradient-to-b from-ast-brand ${lineColor} sm:left-[1.6875rem]`}
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
              className={`relative h-full w-full rounded-full border ${badgeBorder} object-cover shadow-sm transition-all duration-300 group-hover:scale-[1.08] group-hover:border-ast-brand/60 group-hover:shadow-[0_0_16px_rgb(var(--ast-brand)/0.35)]`}
            />
          </span>

          {/* Step Content */}
          <div className={`rounded-2xl border border-transparent p-4 transition-colors duration-300 ${hoverPanel}`}>
            <span className={`text-xs font-semibold tracking-wide ${stepLabel}`}>
              Step {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={`mt-1 text-xl font-semibold tracking-tighter2 transition-colors sm:text-2xl ${titleColor}`}>
              {step.title}
            </h3>
            <p className={`mt-2 max-w-xl text-base leading-relaxed ${descColor}`}>{step.description}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

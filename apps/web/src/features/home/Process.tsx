import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { processSteps } from '../../data/site';

/** Home "How we work" — the engagement process, step by step. */
export function Process() {
  return (
    <Section
      eyebrow="How we work"
      title="A process that keeps you in control"
      description="Short cycles, visible progress, and decisions you can make with confidence."
      className="bg-ats-brand/[0.03]"
    >
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {processSteps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.05}>
            <li className="relative flex h-full flex-col rounded-lg border border-ats-text/10 bg-ats-bg-light p-6 dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
              <span
                className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-ats-brand to-ats-accent text-sm font-bold text-white"
                aria-hidden
              >
                {index + 1}
              </span>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-ats-text-muted">{step.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

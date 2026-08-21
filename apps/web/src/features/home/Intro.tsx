import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';

/** Home intro — what ATS does, in brief. */
export function Intro() {
  return (
    <Section
      eyebrow="What we do"
      title="A software studio for ambitious teams"
      description="ATS designs, builds, and modernizes the systems companies run on — and applies AI where it measurably pays off."
    >
      <Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Build',
              text: 'Custom web and mobile products engineered end-to-end — modern architecture, automated tests, deployed via CI/CD.',
            },
            {
              title: 'Modernize',
              text: 'Legacy systems rebuilt and performance bottlenecks removed — without rewriting what already works.',
            },
            {
              title: 'Accelerate with AI',
              text: 'AI features built into real workflows — forecasting, extraction, classification, and automation, not demos.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-ats-text/10 bg-ats-bg-light p-6 dark:border-ats-bg-light/10 dark:bg-ats-bg-dark"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-ats-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

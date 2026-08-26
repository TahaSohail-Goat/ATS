import { Boxes, Gauge, Sparkles, type LucideIcon } from 'lucide-react';
import { Section } from '../../components/Section';
import { Reveal } from '../../components/motion/Reveal';
import { Stagger } from '../../components/motion/Stagger';
import { SpotlightCard } from '../../components/motion/SpotlightCard';

interface Pillar {
  title: string;
  text: string;
  icon: LucideIcon;
}

const PILLARS: Pillar[] = [
  {
    title: 'Build',
    text: 'Custom web and mobile products engineered end-to-end: modern architecture, automated tests, deployed via CI/CD.',
    icon: Boxes,
  },
  {
    title: 'Modernize',
    text: 'Legacy systems rebuilt and performance bottlenecks removed, without rewriting what already works.',
    icon: Gauge,
  },
  {
    title: 'Accelerate with AI',
    text: 'AI features built into real workflows: forecasting, extraction, classification, and automation, not demos.',
    icon: Sparkles,
  },
];

/** Home intro — what AST does, in brief. */
export function Intro() {
  return (
    <Section
      eyebrow="What we do"
      title="A software studio for"
      titleAccent="ambitious teams"
      description="AST designs, builds, and modernizes the systems companies run on, and applies AI where it measurably pays off."
    >
      <Stagger className="grid gap-5 md:grid-cols-3">
        {PILLARS.map((pillar, index) => (
          <Reveal key={pillar.title} asChild as="div" className="h-full">
            <SpotlightCard
              as="article"
              className="ast-ring-gradient group flex h-full flex-col rounded-4xl border border-ast-line bg-ast-surface/60 p-8 transition-[transform,border-color] duration-500 ease-ast-out hover:border-ast-brand/30 motion-safe:hover:-translate-y-1.5"
            >
              <div className="flex items-start justify-between">
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ast-line bg-ast-surface-raised text-ast-accent"
                >
                  <pillar.icon className="h-5 w-5" />
                </span>
                {/* Full-opacity colours only: a faded numeral would drop
                    below the AA contrast floor for large text. */}
                <span
                  aria-hidden
                  className="font-mono text-4xl font-semibold leading-none tracking-display text-ast-ink-muted transition-colors duration-500 group-hover:bg-ast-brand-gradient group-hover:bg-clip-text group-hover:text-transparent"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-semibold tracking-tighter2">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-ast-ink-muted">{pillar.text}</p>

              <span
                aria-hidden
                className="mt-8 h-px w-full origin-left bg-ast-brand-gradient transition-transform duration-500 ease-ast-out motion-safe:scale-x-0 motion-safe:group-hover:scale-x-100"
              />
            </SpotlightCard>
          </Reveal>
        ))}
      </Stagger>
    </Section>
  );
}

import { Compass, Target } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/motion/Reveal';
import { Stagger } from '../components/motion/Stagger';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { Counter } from '../components/motion/Counter';
import { TeamCard } from '../components/TeamCard';
import { processSteps, techStack } from '../data/site';
import { services } from '../data/services';
import { team } from '../data/team';
import { useSeo } from '../lib/seo';

const PURPOSE = [
  {
    icon: Target,
    title: 'Our mission',
    text: 'To apply serious engineering to real business problems, making advanced technology practical, reliable, and understandable for the teams we work with.',
  },
  {
    icon: Compass,
    title: 'Our vision',
    text: 'A region where ambitious companies can build world-class software without leaving, supported by local engineering talent and honest technical partnerships.',
  },
];

const FACTS = [
  { value: services.length, label: 'Services offered' },
  { value: processSteps.length, label: 'Delivery stages' },
  { value: techStack.length, label: 'Core technologies', suffix: '+' },
];

export function AboutPage() {
  useSeo({
    title: 'About',
    description:
      'AST is a software company that partners with businesses to design, build, and modernize the systems they run on.',
  });

  return (
    <>
      <PageHero
        eyebrow="About AST"
        title="A software studio"
        titleAccent="built by engineers"
        description="AST (AI Software & Technology Solutions) is a software company that partners with businesses to design, build, and modernize the systems they run on."
      />

      <Section space="loose">
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {PURPOSE.map((item) => (
            <Reveal key={item.title} asChild as="div" className="h-full">
              <SpotlightCard
                as="article"
                className="ast-ring-gradient flex h-full flex-col rounded-4xl border border-ast-line bg-ast-surface/60 p-8 sm:p-11"
              >
                <span
                  aria-hidden
                  className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-ast-line bg-ast-surface-raised text-ast-accent"
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-semibold tracking-tighter2">{item.title}</h2>
                <p className="mt-4 leading-relaxed text-ast-ink-muted">{item.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-5">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-4xl border border-ast-line bg-ast-line sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div key={fact.label} className="bg-ast-surface/60 px-8 py-9 text-center">
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <Counter
                    value={fact.value}
                    suffix={fact.suffix}
                    className="block bg-ast-brand-gradient bg-clip-text text-4xl font-semibold tracking-display text-transparent"
                  />
                  <span className="mt-2 block text-xs font-medium uppercase tracking-[0.16em] text-ast-ink-muted">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <Section
        eyebrow="Our team"
        title="The people"
        titleAccent="behind AST"
        description="A small team of engineers and builders who ship, review, and stand behind every system we hand over."
        tone="raised"
      >
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Reveal key={member.name} asChild as="div" className="h-full">
              <TeamCard member={member} />
            </Reveal>
          ))}
        </Stagger>
      </Section>

      <CtaSection
        title="Let's talk about"
        titleAccent="your project"
        description="Whether you need a full product or a second opinion, we're glad to help."
      />
    </>
  );
}

import { Compass, Target } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/motion/Reveal';
import { Stagger } from '../components/motion/Stagger';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { TeamCard } from '../components/TeamCard';
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
        image="/stock/hero-team.jpg"
      />

      <Section space="loose">
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {PURPOSE.map((item) => (
            <Reveal key={item.title} asChild as="div" className="h-full">
              <SpotlightCard
                as="article"
                className="flex h-full flex-col rounded-4xl border border-ast-line bg-ast-surface p-8 shadow-ast-card sm:p-11"
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
      </Section>

      <Section
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

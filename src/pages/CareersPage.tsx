import { Eye, Handshake, Star, TrendingUp, type LucideIcon } from 'lucide-react';
import { Badge } from '@ats/ui';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { CtaSection } from '../components/CtaSection';
import { ArrowLink } from '../components/ArrowLink';
import { Reveal } from '../components/motion/Reveal';
import { Stagger } from '../components/motion/Stagger';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { values } from '../data/site';

const valueIcons: LucideIcon[] = [Star, Handshake, Eye, TrendingUp];

export function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build serious software with"
        titleAccent="people who care"
        description="We're a small, senior team. No bureaucracy, no cargo-cult process — just good engineering and ownership over outcomes."
      >
        <Reveal delay={0.16} className="mt-8">
          <Badge tone="accent" dot>
            Always reviewing speculative applications
          </Badge>
        </Reveal>
      </PageHero>

      <Section
        eyebrow="Culture"
        title="What working here"
        titleAccent="actually means"
        space="loose"
      >
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = valueIcons[index] ?? Star;
            return (
              <Reveal key={value.title} asChild as="div" className="h-full">
                <SpotlightCard
                  as="article"
                  className="group flex h-full flex-col rounded-4xl border border-ats-line bg-ats-surface/60 p-7 transition-[transform,border-color] duration-500 ease-ats-out hover:border-ats-brand/30 motion-safe:hover:-translate-y-1.5"
                >
                  <span
                    aria-hidden
                    className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-ats-line bg-ats-surface-raised text-ats-accent"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold tracking-tighter2">{value.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ats-ink-muted">
                    {value.description}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </Stagger>
      </Section>

      <Section eyebrow="Openings" title="Current" titleAccent="positions" tone="raised">
        <Reveal>
          <div className="ats-ring-gradient relative overflow-hidden rounded-4xl border border-dashed border-ats-line bg-ats-surface/50 px-8 py-16 text-center">
            <p className="text-xl font-semibold tracking-tighter2">No open positions right now.</p>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-ats-ink-muted">
              We&apos;re always interested in exceptional engineers and designers. Tell us why
              you&apos;d be a good fit — we reply to every message.
            </p>
            <div className="mt-8 flex justify-center">
              <ArrowLink href="/contact">Send a speculative application</ArrowLink>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaSection
        title="Want to"
        titleAccent="work with us?"
        description="Send a short introduction — we reply to every message, even when we're not hiring."
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />
    </>
  );
}

import type { Metadata } from 'next';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { CtaSection } from '../../components/CtaSection';
import { values } from '../../data/site';
import { Star, Handshake, Eye, TrendingUp, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'ATS — AI Software & Technology Solutions. Who we are, our mission, and the principles behind our engineering.',
};

const valueIcons: LucideIcon[] = [Star, Handshake, Eye, TrendingUp];

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="About ATS"
        title="A software studio built by engineers"
        description="ATS — AI Software & Technology Solutions — is a software company that partners with businesses to design, build, and modernize the systems they run on."
      >
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-ats-text/10 bg-ats-bg-light p-8 dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
              <h2 className="text-lg font-semibold">Our mission</h2>
              <p className="mt-3 text-ats-text-muted">
                To apply serious engineering to real business problems — and to make advanced
                technology practical, reliable, and understandable for the teams we work with.
              </p>
            </div>
            <div className="rounded-lg border border-ats-text/10 bg-ats-bg-light p-8 dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
              <h2 className="text-lg font-semibold">Our vision</h2>
              <p className="mt-3 text-ats-text-muted">
                A region where ambitious companies can build world-class software without leaving —
                supported by local engineering talent and honest technical partnerships.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow="How we work"
        title="The principles behind our engineering"
        className="bg-ats-brand/[0.03]"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = valueIcons[index] ?? Star;
            return (
              <Reveal key={value.title} delay={index * 0.05}>
                <div className="flex h-full flex-col rounded-lg border border-ats-text/10 bg-ats-bg-light p-6 dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-ats-accent/10 text-ats-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h2 className="font-semibold">{value.title}</h2>
                  <p className="mt-2 text-sm text-ats-text-muted">{value.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaSection
        title="Let's talk about your project"
        description="Whether you need a full product or a second opinion, we're glad to help."
      />
    </>
  );
}

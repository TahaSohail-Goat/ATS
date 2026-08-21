import type { Metadata } from 'next';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { CtaSection } from '../../components/CtaSection';
import { values } from '../../data/site';
import { Star, Handshake, Eye, TrendingUp, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join ATS — engineering culture, our values, and how to work with us. Open positions are listed here when available.',
};

const valueIcons: LucideIcon[] = [Star, Handshake, Eye, TrendingUp];

export default function CareersPage() {
  return (
    <>
      <Section
        eyebrow="Careers"
        title="Build serious software with people who care"
        description="We're a small, senior team. No bureaucracy, no cargo-cult process — just good engineering and ownership over outcomes."
      >
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = valueIcons[index] ?? Star;
              return (
                <div
                  key={value.title}
                  className="flex h-full flex-col rounded-lg border border-ats-text/10 bg-ats-bg-light p-6 dark:border-ats-bg-light/10 dark:bg-ats-bg-dark"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-ats-accent/10 text-ats-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h2 className="font-semibold">{value.title}</h2>
                  <p className="mt-2 text-sm text-ats-text-muted">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Openings" title="Current positions">
        <Reveal>
          <div className="rounded-lg border border-dashed border-ats-text/20 p-10 text-center dark:border-ats-bg-light/20">
            <p className="font-medium">No open positions right now.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ats-text-muted">
              We&apos;re always interested in exceptional engineers and designers. Tell us why
              you&apos;d be a good fit — we reply to every message.
            </p>
          </div>
        </Reveal>
      </Section>

      <CtaSection
        title="Want to work with us?"
        description="Send a short introduction — we reply to every message, even when we're not hiring."
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />
    </>
  );
}

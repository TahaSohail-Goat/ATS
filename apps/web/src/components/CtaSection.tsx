import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@ats/ui';
import { Container } from './Container';

interface CtaSectionProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  children?: ReactNode;
}

/** Shared dark-band CTA closing a page — used on every content page. */
export function CtaSection({
  title,
  description,
  ctaLabel = 'Start a Project',
  ctaHref = '/contact',
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-ats-primary py-20 text-center sm:py-28">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-ats-brand/15 blur-3xl"
      />
      <Container className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-ats-bg-light sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-balance text-ats-bg-light/70">{description}</p>
        )}
        <div className="mt-10">
          <Button asChild size="lg" className="shadow-lg shadow-ats-accent/10">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

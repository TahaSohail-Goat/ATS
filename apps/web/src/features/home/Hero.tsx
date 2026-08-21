import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@ats/ui';
import { Container } from '../../components/Container';

/** Home hero — brand promise, primary CTA (Start a Project), secondary CTA (View Our Work). */
export function Hero() {
  return (
    <section className="ats-hero-grid relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 right-[-8rem] h-96 w-96 rounded-full bg-ats-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-ats-accent/10 blur-3xl"
      />
      <Container className="relative flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
        <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-ats-brand/20 bg-ats-brand/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ats-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-ats-accent" aria-hidden />
          AI Software &amp; Technology Solutions
        </p>
        <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          We build software that{' '}
          <span className="bg-gradient-to-r from-ats-brand to-ats-secondary bg-clip-text text-transparent">
            moves businesses forward
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-ats-text-muted">
          ATS designs and ships custom software, AI features, and cloud infrastructure for companies
          that outgrow templates — clean architecture, measurable results, and a team you can
          actually reach.
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group w-full shadow-lg shadow-ats-brand/25 hover:shadow-xl hover:shadow-ats-brand/30 sm:w-auto"
          >
            <Link href="/contact" className="inline-flex items-center justify-center gap-2">
              Start a Project
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
            <Link href="/projects" className="inline-flex items-center justify-center gap-2">
              View Our Work
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

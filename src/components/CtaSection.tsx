import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@ast/ui';
import { Container } from './Container';
import { Reveal } from './motion/Reveal';
import { Magnetic } from './motion/Magnetic';

interface CtaSectionProps {
  title: string;
  /** Trailing words of the title, rendered with the brand gradient. */
  titleAccent?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  children?: ReactNode;
}

/** Shared closing CTA band, used on every content page. */
export function CtaSection({
  title,
  titleAccent,
  description,
  ctaLabel = 'Start a Project',
  ctaHref = '/contact',
  children,
}: CtaSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-t border-ast-ink/10 bg-ast-canvas py-24 sm:py-32">
      <img
        src="/stock/cta-office.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 85% at 50% 50%, rgb(var(--ast-canvas) / 0.95), rgb(var(--ast-canvas) / 0.6) 100%)',
        }}
      />

      <Container className="relative text-center">
        <Reveal as="h2" className="mx-auto max-w-3xl text-display-md font-semibold text-ast-ink">
          {title}{' '}
          {titleAccent && <span className="text-ast-accent">{titleAccent}</span>}
        </Reveal>
        {description && (
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ast-ink-muted">
              {description}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.14} className="mt-10 flex justify-center">
          <Magnetic strength={12}>
            <Button asChild size="xl">
              <Link to={ctaHref}>
                {ctaLabel}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Button>
          </Magnetic>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}

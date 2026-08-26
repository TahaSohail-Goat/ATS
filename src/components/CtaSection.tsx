import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@ast/ui';
import { Container } from './Container';
import { Aurora } from './Aurora';
import { Reveal } from './motion/Reveal';
import { RevealText } from './motion/RevealText';
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

/** Shared closing CTA band — used on every content page. */
export function CtaSection({
  title,
  titleAccent,
  description,
  ctaLabel = 'Start a Project',
  ctaHref = '/contact',
  children,
}: CtaSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-t border-ast-line bg-ast-canvas py-24 sm:py-32">
      <Aurora variant="band" />
      <div aria-hidden className="ast-hairline absolute inset-x-0 top-0 h-px" />

      <Container className="relative text-center">
        <RevealText
          as="h2"
          className="mx-auto max-w-3xl text-display-md font-semibold"
          parts={
            titleAccent
              ? [{ text: title }, { text: titleAccent, gradient: true }]
              : [{ text: title }]
          }
        />
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

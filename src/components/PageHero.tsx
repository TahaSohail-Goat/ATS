import type { ReactNode } from 'react';
import { Container } from './Container';
import { Aurora } from './Aurora';
import { SectionHeading } from './SectionHeading';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  /** Trailing words of the title, rendered with the brand gradient. */
  titleAccent?: string;
  description?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

/**
 * Opening band for interior pages: quiet aurora, eyebrow, and the page's
 * single `h1`. Keeps every route's entrance consistent with the homepage
 * without repeating the hero's full choreography.
 */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  align = 'left',
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-ast-line pb-16 pt-16 sm:pb-24 sm:pt-24">
      <Aurora variant="quiet" />
      <Container className="relative">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          titleAccent={titleAccent}
          description={description}
          headingLevel={1}
          size="lg"
          align={align}
          className={align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'}
        >
          {children}
        </SectionHeading>
      </Container>
    </section>
  );
}

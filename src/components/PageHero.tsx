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
  /** Full-bleed photo background instead of the quiet aurora grid. */
  image?: string;
  children?: ReactNode;
}

/**
 * Opening band for interior pages. Without `image`, a quiet aurora, eyebrow,
 * and the page's single `h1` — keeps every route's entrance consistent with
 * the homepage without repeating the hero's full choreography. With `image`,
 * an always-dark photo band matching the Home redesign instead.
 */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  align = 'left',
  image,
  children,
}: PageHeroProps) {
  if (image) {
    const centered = align === 'center';
    return (
      <section
        className="relative isolate overflow-hidden bg-cover bg-center py-20 sm:py-28"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgb(var(--ast-primary) / 0.95) 40%, rgb(var(--ast-primary) / 0.6) 100%)',
          }}
        />
        <Container className={`relative ${centered ? 'text-center' : ''}`}>
          <h1
            className={`text-display-lg font-semibold text-ast-on-dark ${centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}`}
          >
            {title} {titleAccent && <span className="text-ast-accent-on-dark">{titleAccent}</span>}
          </h1>
          {description && (
            <p
              className={`mt-6 text-lg leading-relaxed text-ast-on-dark-muted ${centered ? 'mx-auto max-w-prose' : 'max-w-prose'}`}
            >
              {description}
            </p>
          )}
          {children}
        </Container>
      </section>
    );
  }

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

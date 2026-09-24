import type { ReactNode } from 'react';
import { Container } from './Container';
import { Reveal } from './motion/Reveal';
import { SectionHeading } from './SectionHeading';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  /** Trailing words of the title, rendered with the brand gradient. */
  titleAccent?: string;
  headingLevel?: 1 | 2;
  description?: string;
  /** Slot beside the heading block on desktop (e.g. a "view all" link). */
  action?: ReactNode;
  align?: 'left' | 'center';
  /** `lg` for page-opening headings, `md` for in-page sections. */
  headingSize?: 'md' | 'lg';
  /**
   * Screen-reader-only heading for sections with no visible title. Without it
   * a card grid jumps straight from the page `h1` to the cards' `h3`, which
   * skips a level for anyone navigating by headings.
   */
  srTitle?: string;
  /** `raised` tints the band so adjacent sections separate without borders. */
  tone?: 'canvas' | 'raised';
  /** Vertical rhythm. `tight` for stacked sub-sections. */
  space?: 'tight' | 'base' | 'loose';
  /** Full-bleed photo background (like the Home hero/CTA) instead of the themed tone. */
  image?: string;
  className?: string;
  children: ReactNode;
}

const spacing = {
  tight: 'py-14 sm:py-16',
  base: 'py-20 sm:py-28',
  loose: 'py-24 sm:py-36',
} as const;

const spacingTop = {
  tight: 'pt-14 sm:pt-16',
  base: 'pt-20 sm:pt-28',
  loose: 'pt-24 sm:pt-36',
} as const;

const spacingBottom = {
  tight: 'pb-14 sm:pb-16',
  base: 'pb-20 sm:pb-28',
  loose: 'pb-24 sm:pb-36',
} as const;

/**
 * Vertical page section with the standard heading block and padded container.
 */
export function Section({
  id,
  eyebrow,
  title,
  titleAccent,
  headingLevel = 2,
  description,
  action,
  align = 'left',
  headingSize = 'md',
  srTitle,
  tone = 'canvas',
  space = 'base',
  image,
  className = '',
  children,
}: SectionProps) {
  const centered = align === 'center';
  const hasHeading = Boolean(eyebrow || title);
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  const headingBlock = hasHeading && (
    <div
      className={`flex flex-col gap-8 ${
        centered ? 'items-center' : action ? 'lg:flex-row lg:items-end lg:justify-between' : ''
      }`}
    >
      {image ? (
        <div className={centered ? 'max-w-3xl text-center' : 'max-w-2xl'}>
          {title && (
            <Heading
              className={`ast-photo-text font-semibold text-ast-ink ${headingSize === 'lg' ? 'text-display-lg' : 'text-display-md'}`}
            >
              {title} {titleAccent && <span className="text-ast-accent">{titleAccent}</span>}
            </Heading>
          )}
          {description && (
            <p className="ast-photo-text mt-6 text-lg leading-relaxed text-ast-ink-muted">{description}</p>
          )}
        </div>
      ) : (
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          titleAccent={titleAccent}
          headingLevel={headingLevel}
          description={description}
          align={align}
          size={headingSize}
          className={centered ? 'max-w-3xl' : 'max-w-2xl'}
        />
      )}
      {action && <Reveal delay={0.12}>{action}</Reveal>}
    </div>
  );

  // The photo has to behave differently by screen size. `bg-cover` stretches
  // to whatever height its element ends up, so on a phone, where the content
  // below the heading is a very tall stack, covering the whole section would
  // scale and crop the photo far past what the source supports. So below `lg`
  // it is bounded to the heading band; from `lg` up, where the section is
  // roughly as wide as it is tall, it covers the whole section.
  if (image) {
    const scrim =
      'linear-gradient(100deg, rgb(var(--ast-canvas) / var(--ast-scrim-strong)) 45%, rgb(var(--ast-canvas) / var(--ast-scrim-soft)) 100%)';

    return (
      <section id={id} className={`relative isolate ${className}`}>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden bg-cover bg-center lg:block"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden lg:block"
          style={{ background: scrim }}
        />

        <div className={`relative ${spacingTop[space]} pb-10 sm:pb-14 lg:pb-0`}>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center lg:hidden"
            style={{ backgroundImage: `url('${image}')` }}
          />
          <div aria-hidden className="absolute inset-0 lg:hidden" style={{ background: scrim }} />
          <Container className="relative">
            {srTitle && !hasHeading && <h2 className="sr-only">{srTitle}</h2>}
            {headingBlock}
          </Container>
        </div>

        <div className={`relative pt-10 sm:pt-14 lg:pt-16 ${spacingBottom[space]}`}>
          <Container className="relative">{children}</Container>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`relative ${spacing[space]} ${tone === 'raised' ? 'bg-ast-surface/50' : ''} ${className}`}
    >
      {tone === 'raised' && (
        <>
          <div aria-hidden className="ast-hairline absolute inset-x-0 top-0 h-px" />
          <div aria-hidden className="ast-dots pointer-events-none absolute inset-0 opacity-60" />
        </>
      )}

      <Container className="relative">
        {srTitle && !hasHeading && <h2 className="sr-only">{srTitle}</h2>}
        {hasHeading && <div className="mb-12 sm:mb-16">{headingBlock}</div>}
        {children}
      </Container>
    </section>
  );
}

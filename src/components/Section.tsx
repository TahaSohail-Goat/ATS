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
  className?: string;
  children: ReactNode;
}

const spacing = {
  tight: 'py-14 sm:py-16',
  base: 'py-20 sm:py-28',
  loose: 'py-24 sm:py-36',
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
  className = '',
  children,
}: SectionProps) {
  const centered = align === 'center';
  const hasHeading = Boolean(eyebrow || title);

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
        {hasHeading && (
          <div
            className={`mb-12 flex flex-col gap-8 sm:mb-16 ${
              centered
                ? 'items-center'
                : action
                  ? 'lg:flex-row lg:items-end lg:justify-between'
                  : ''
            }`}
          >
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
            {action && <Reveal delay={0.12}>{action}</Reveal>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

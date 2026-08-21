import type { ReactNode } from 'react';
import { Reveal } from './motion/Reveal';
import { RevealText } from './motion/RevealText';

export interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  /** Trailing words of the title, rendered with the brand gradient. */
  titleAccent?: string;
  headingLevel?: 1 | 2;
  description?: string;
  align?: 'left' | 'center';
  /** `lg` for page-opening headings, `md` for in-page sections. */
  size?: 'md' | 'lg';
  className?: string;
  children?: ReactNode;
}

/**
 * The standard eyebrow + animated title + description block. Extracted so
 * custom layouts (e.g. the sticky process column) match `Section` exactly.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  headingLevel = 2,
  description,
  align = 'left',
  size = 'md',
  className = '',
  children,
}: SectionHeadingProps) {
  const heading = headingLevel === 1 ? 'h1' : 'h2';
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal direction="none">
          <p
            className={`mb-5 inline-flex items-center gap-2.5 rounded-full border border-ats-line bg-ats-surface/60 px-3.5 py-1.5 text-eyebrow font-semibold uppercase text-ats-accent ${
              centered ? 'mx-auto' : ''
            }`}
          >
            <span aria-hidden className="h-1 w-1 rounded-full bg-ats-accent" />
            {eyebrow}
          </p>
        </Reveal>
      )}

      {title && (
        <RevealText
          as={heading}
          className={`font-semibold ${size === 'lg' ? 'text-display-lg' : 'text-display-md'}`}
          parts={
            titleAccent
              ? [{ text: title }, { text: titleAccent, gradient: true }]
              : [{ text: title }]
          }
        />
      )}

      {description && (
        <Reveal delay={0.08}>
          <p
            className={`mt-6 text-lg leading-relaxed text-ats-ink-muted ${
              centered ? 'mx-auto max-w-prose' : 'max-w-prose'
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}

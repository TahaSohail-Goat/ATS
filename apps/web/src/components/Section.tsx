import type { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Vertical page section with a consistent heading block
 * (eyebrow + title + optional description) and padded container.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  className = '',
  children,
}: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        {(eyebrow || title) && (
          <div className="mb-10 max-w-2xl sm:mb-14">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-ats-brand">
                {eyebrow}
              </p>
            )}
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            {description && <p className="mt-4 text-ats-text-muted">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

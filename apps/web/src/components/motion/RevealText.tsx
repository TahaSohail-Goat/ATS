'use client';

import type { ElementType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, viewportOnce } from '../../lib/motion';

export interface TextPart {
  text: string;
  /** Render this run with the brand gradient. */
  gradient?: boolean;
}

interface RevealTextProps {
  parts: TextPart[];
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (hero headings). */
  immediate?: boolean;
}

/**
 * Lightweight heading reveal. The heading is animated as one layer instead of
 * animating every word independently; this keeps gradient text and fallback
 * font glyphs painted together while reducing client-side motion nodes.
 *
 * Accessibility: each text run remains a normal text span, so the heading's
 * accessible name is identical to the plain sentence.
 */
export function RevealText({
  parts,
  as = 'h2',
  className,
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const Component = as as ElementType;

  const runs = parts.map((part) => ({
    gradient: part.gradient ?? false,
    words: part.text.split(' ').filter(Boolean),
  }));

  if (reduceMotion) {
    return (
      <Component className={className}>
        {runs.map((run, runIndex) => (
          <span key={runIndex} className={run.gradient ? 'ats-text-gradient' : undefined}>
            {run.words.join(' ')}
            {runIndex < runs.length - 1 ? ' ' : null}
          </span>
        ))}
      </Component>
    );
  }

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.h2;
  const trigger = immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: viewportOnce };
  const variants = revealVariants('up', false, delay);

  return (
    <MotionComponent className={className} variants={variants} initial="hidden" {...trigger}>
      {runs.map((run, runIndex) => (
        <span key={runIndex} className={run.gradient ? 'ats-text-gradient' : undefined}>
          {run.words.join(' ')}
          {runIndex < runs.length - 1 ? ' ' : null}
        </span>
      ))}
    </MotionComponent>
  );
}

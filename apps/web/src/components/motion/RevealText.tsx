'use client';

import type { ElementType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, stagger, viewportOnce, wordVariants } from '../../lib/motion';

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
 * Word-by-word heading reveal. Each word sits in an overflow-clipped span so
 * the type rises into place instead of fading in flat.
 *
 * Accessibility: words keep their trailing space inside the span, so the
 * accessible name of the heading is identical to the plain sentence.
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

  return (
    <MotionComponent
      className={className}
      variants={staggerContainer(stagger.tight, delay)}
      initial="hidden"
      {...trigger}
    >
      {runs.map((run, runIndex) => (
        <span key={runIndex} className={run.gradient ? 'ats-text-gradient' : undefined}>
          {run.words.map((word, wordIndex) => (
            // The separating space is a text node in the parent, not inside
            // the clipped span, so the heading's accessible name stays a
            // normal space-separated sentence.
            <span key={`${runIndex}-${wordIndex}`}>
              <span className="inline-block overflow-hidden pb-[0.16em]">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>{' '}
            </span>
          ))}
        </span>
      ))}
    </MotionComponent>
  );
}

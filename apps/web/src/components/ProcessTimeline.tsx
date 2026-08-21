'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { ProcessStep } from '../data/site';
import { Reveal } from './motion/Reveal';

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

/**
 * Vertical timeline whose rail fills in step with scroll position, so the
 * process reads as progress rather than as a static list.
 *
 * Client component: needs scroll position. Under prefers-reduced-motion the
 * rail renders fully drawn and the steps appear immediately.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 65%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative pl-12 sm:pl-16">
      {/* Rail track + scroll-driven fill. */}
      <span
        aria-hidden
        className="absolute bottom-2 left-[1.1875rem] top-2 w-px bg-ats-line sm:left-[1.6875rem]"
      />
      <span
        aria-hidden
        className="absolute bottom-2 left-[1.1875rem] top-2 w-px overflow-hidden sm:left-[1.6875rem]"
      >
        {reduceMotion ? (
          <span className="block h-full w-px bg-ats-brand-gradient" />
        ) : (
          <motion.span
            style={{ scaleY }}
            className="block h-full w-px origin-top bg-ats-brand-gradient"
          />
        )}
      </span>

      {steps.map((step, index) => (
        <Reveal key={step.title} as="li" delay={index * 0.04} className="relative pb-12 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ats-line bg-ats-surface font-mono text-sm font-semibold text-ats-accent sm:-left-16"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl font-semibold tracking-tighter2 sm:text-2xl">{step.title}</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-ats-ink-muted">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}

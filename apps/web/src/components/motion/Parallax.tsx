'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  /** Total travel in pixels across the element's scroll pass. */
  distance?: number;
  className?: string;
}

/**
 * Translates its child on the Y axis as the element passes through the
 * viewport. Transform-only and spring-smoothed to avoid scroll jank; a no-op
 * under prefers-reduced-motion.
 */
export function Parallax({ children, distance = 60, className }: ParallaxProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  const y = useSpring(rawY, { stiffness: 120, damping: 30, mass: 0.4 });

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="ats-gpu h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

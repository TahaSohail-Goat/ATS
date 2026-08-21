'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/**
 * Reading-progress line pinned under the header. Decorative, so it is hidden
 * from assistive technology and omitted entirely under reduced motion.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-ats-brand via-ats-accent to-ats-violet"
    />
  );
}

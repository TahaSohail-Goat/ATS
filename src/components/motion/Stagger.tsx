'use client';

import type { ElementType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, stagger, viewportOnce } from '../../lib/motion';

interface StaggerProps {
  children: ReactNode;
  /** Seconds between each child's entrance. */
  step?: number;
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Staggers the entrance of `Reveal asChild` (or any variant-aware) children
 * once the group scrolls into view. Sequencing lives on the parent so grids
 * do not need per-item delay math.
 */
export function Stagger({
  children,
  step = stagger.base,
  delay = 0,
  className,
  as = 'div',
}: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Static = as as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Component
      className={className}
      variants={staggerContainer(step, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}

'use client';

import type { ElementType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, viewportOnce, type RevealDirection } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  /** Slide direction the element travels *from*. */
  direction?: RevealDirection;
  delay?: number;
  /** Adds a short blur-in. Reserve for hero-level content. */
  blur?: boolean;
  className?: string;
  /** Element to render — use `li`/`article` to keep markup semantic. */
  as?: ElementType;
  /** Animate as a stagger child of a parent `Stagger` instead of on scroll. */
  asChild?: boolean;
  /**
   * Animate on mount/update instead of on scroll. Use for items in a list
   * whose membership changes at runtime (a filter, a "show more" toggle):
   * `whileInView` only fires once per element, so an item added after the
   * container's initial trigger has already fired would otherwise stay
   * invisible forever.
   */
  immediate?: boolean;
}

/**
 * Scroll-in reveal (opacity + transform only). Respects
 * prefers-reduced-motion by rendering content immediately — see
 * docs/frontend/animation-guidelines.md.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  blur = false,
  className,
  as = 'div',
  asChild = false,
  immediate = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Static = as as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  const variants = revealVariants(direction, blur);

  if (asChild) {
    return (
      <Component className={className} variants={variants}>
        {children}
      </Component>
    );
  }

  if (immediate) {
    return (
      <Component
        className={className}
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay }}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

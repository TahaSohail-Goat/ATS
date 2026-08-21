import type { Transition, Variants } from 'framer-motion';
import { duration, easing, stagger } from '@ats/ui';

/**
 * Shared motion vocabulary for the site. Every animated component pulls its
 * timing from here so the whole page feels like one system rather than a
 * collection of one-off tweaks.
 *
 * Tokens live in packages/ui/src/tokens/motion.ts; the tiers and the
 * reduced-motion contract are documented in
 * docs/frontend/animation-guidelines.md.
 */

type Bezier = [number, number, number, number];

export const easeOut = [...easing.out] as Bezier;
export const easeInOut = [...easing.inOut] as Bezier;
export const easeEmphasized = [...easing.emphasized] as Bezier;

/** Entrance transition for content blocks. */
export const transitionReveal: Transition = { duration: duration.slow, ease: easeOut };

/** Standard UI state transition (menus, toggles). */
export const transitionUi: Transition = { duration: duration.base, ease: easeInOut };

/** Spring used for pointer-following and layout indicators. */
export const springSoft: Transition = { type: 'spring', stiffness: 220, damping: 26, mass: 0.6 };
export const springSnappy: Transition = { type: 'spring', stiffness: 380, damping: 30 };

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET = 22;

function offsetFor(direction: RevealDirection) {
  switch (direction) {
    case 'up':
      return { y: OFFSET };
    case 'down':
      return { y: -OFFSET };
    case 'left':
      return { x: OFFSET };
    case 'right':
      return { x: -OFFSET };
    default:
      return {};
  }
}

/** Fade + slide entrance. `blur` adds a subtle focus-in for hero content. */
export function revealVariants(direction: RevealDirection = 'up', blur = false): Variants {
  return {
    hidden: { opacity: 0, ...offsetFor(direction), ...(blur ? { filter: 'blur(8px)' } : {}) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(blur ? { filter: 'blur(0px)' } : {}),
      transition: transitionReveal,
    },
  };
}

/** Parent that staggers its children's `visible` state. */
export function staggerContainer(step: number = stagger.base, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren } },
  };
}

/** Word-level heading reveal — pairs with `staggerContainer`. */
export const wordVariants: Variants = {
  hidden: { opacity: 0, y: '0.42em' },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slower, ease: easeOut } },
};

/** Default in-view trigger: fire once, slightly before the block is centred. */
export const viewportOnce = { once: true, margin: '-12% 0px -8% 0px' } as const;

export { duration, stagger };

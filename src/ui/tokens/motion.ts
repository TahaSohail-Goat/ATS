/**
 * Motion tokens — the only durations/easings the AST brand uses.
 * See docs/frontend/animation-guidelines.md for when each tier applies.
 * Every consumer must provide a `prefers-reduced-motion` fallback.
 */
export const duration = {
  /** Micro-feedback: hover, focus, small state flips. */
  fast: 0.15,
  /** Standard UI transitions: menus, disclosure, tabs. */
  base: 0.25,
  /** Entrance/reveal of content blocks. */
  slow: 0.5,
  /** Large hero/section choreography only. */
  slower: 0.8,
} as const;

/** Cubic-bezier curves as [x1, y1, x2, y2] tuples (Framer Motion `ease`). */
export const easing = {
  /** Default out-curve for entrances — calm, no overshoot. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric curve for state changes that reverse. */
  inOut: [0.65, 0, 0.35, 1],
  /** Slight anticipation for playful accents (use sparingly). */
  emphasized: [0.34, 1.26, 0.64, 1],
} as const;

/** Stagger step between sibling reveals, in seconds. */
export const stagger = {
  tight: 0.04,
  base: 0.07,
  loose: 0.12,
} as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;

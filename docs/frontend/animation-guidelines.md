# Animation Guidelines

Framer Motion is used for intentional, purposeful motion — not decoration for
its own sake. Timing comes from tokens in `packages/ui/src/tokens/motion.ts`
and shared variants in `apps/web/src/lib/motion.ts`.

## Current motion budget

- `Reveal`, `Stagger`, and `RevealText` provide brief entrance choreography.
- The header keeps Framer Motion only for the active-nav indicator and mobile
  menu.
- Hero capability marquee is CSS-only.
- Aurora fields are limited to two small layers and drift only on the hero;
  interior-page fields are static.
- Project cards do not use scroll-linked parallax.
- Cards do not attach pointermove handlers or call `getBoundingClientRect()`.
- Counters render their final content directly instead of running a per-frame
  count-up loop.
- The header has no global scroll listener and the reading-progress bar was
  removed.

## Rules

- Animate transform and opacity only. Avoid continuous filter repaints.
- Do not add global scroll listeners; use CSS where possible.
- Do not add per-card scroll observers or pointer handlers for decorative
  effects.
- Entrance animations must never block interaction and should fire once.
- Decorative loops are `aria-hidden` and stop under reduced motion.

## Reduced motion

Every animated component has a static finished-state fallback. The global
`prefers-reduced-motion` rule in `globals.css` also collapses CSS animation and
transition durations and disables smooth scrolling.

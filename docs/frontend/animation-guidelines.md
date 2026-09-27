# Animation Guidelines

Framer Motion is used for intentional, purposeful motion — not decoration for
its own sake. Timing comes from tokens in `packages/ui/src/tokens/motion.ts`
and shared variants in `apps/web/src/lib/motion.ts`.

## Current motion budget

- `Reveal`, `Stagger`, and `RevealText` provide brief entrance choreography.
- The header keeps Framer Motion only for the active-nav indicator and mobile
  menu.
- The home hero plays a pre-rendered brand film (`src/features/home/HeroVideo.tsx`,
  assets in `public/video/hero/`). It is a muted, seamless 16s loop. The hero is
  a dark band in both themes, so there is one cut per orientation
  (`dark-{landscape,portrait}`), each an H.264 MP4 plus a poster that is the
  film's first frame. It pauses while the hero is off screen, has a visible
  pause/play control (WCAG 2.2.2), and shows only the poster under reduced
  motion or Data Saver.
- The home services row (`src/features/home/ServicesOverview.tsx`) is a
  continuous ticker: two copies of the cards slide left by one copy's width and
  loop (`.ast-marquee` in `globals.css`). It is a CSS transform animation, so it
  runs on the compositor at a constant ~40px/s with no per-frame script. It holds
  still on hover and while focus is inside (a focused card is scrolled fully into
  view), and a visible Pause/Play button covers WCAG 2.2.2. The second copy is
  `aria-hidden` and `inert`. Under reduced motion there is no animation and no
  button; the row is a plain swipe-able strip of one copy.
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

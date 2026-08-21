# Animation Guidelines

Framer Motion is used for intentional, purposeful motion — not decoration for
its own sake. Timing comes from tokens in `packages/ui/src/tokens/motion.ts`
and shared variants in `apps/web/src/lib/motion.ts`; components should not
invent their own durations or curves.

## Tiers

| Tier              | Duration | Use                                              |
| ----------------- | -------- | ------------------------------------------------ |
| `duration.fast`   | 150ms    | Hover, focus, small state flips                  |
| `duration.base`   | 250ms    | Menus, disclosure, tabs — anything that reverses |
| `duration.slow`   | 500ms    | Entrance/reveal of a content block               |
| `duration.slower` | 800ms    | Hero and section choreography only               |

Easing: `easing.out` for entrances (calm, no overshoot), `easing.inOut` for
reversible state changes, `easing.emphasized` sparingly for playful accents.
Stagger between siblings: `stagger.tight` (words), `stagger.base` (cards).

## Rules

- Animate `transform` and `opacity` only. Never animate `width`, `height`,
  `top`, or `left` — they force layout. `filter: blur()` is allowed for hero
  content only, where the element count is small.
- Entrance animations must never block interaction. Content is in the DOM and
  readable regardless of animation state; reveals fire once
  (`viewportOnce`) and do not replay on scroll-back.
- Scroll-linked motion (`useScroll`) must be spring-smoothed and marked
  `ats-gpu` so it is composited rather than recalculated per frame.
- Loops (marquee, aurora drift, pulse rings) belong to decorative,
  `aria-hidden` layers only.
- Prefer CSS to JS where the effect has no state: `Marquee` and `Aurora` are
  deliberately CSS-only server components with no client boundary.
- Avoid animating on state that changes every frame. `Counter` writes to
  `textContent` and `SpotlightCard` writes CSS custom properties, so neither
  triggers a React re-render.

## Reduced motion — required

Every animated component checks `useReducedMotion()` and returns a static
equivalent. `globals.css` additionally collapses all animation and transition
durations under `prefers-reduced-motion: reduce` as a backstop, and disables
smooth scrolling.

The static fallback must be the _finished_ state, never a hidden one:

| Component         | Reduced-motion behaviour                               |
| ----------------- | ------------------------------------------------------ |
| `Reveal`          | Renders the plain element, fully visible               |
| `RevealText`      | Renders the sentence as normal text runs               |
| `Stagger`         | Renders children with no sequencing                    |
| `Counter`         | Renders the final value (also the server-rendered one) |
| `Magnetic`        | Renders a plain wrapper, no pointer tracking           |
| `Parallax`        | No transform                                           |
| `ProcessTimeline` | Rail renders fully drawn                               |
| `ScrollProgress`  | Not rendered at all                                    |
| `Marquee`         | Track holds position; content stays readable           |

## Motion primitives

`apps/web/src/components/motion/`:

- `Reveal` — fade + directional slide on scroll, or as a `Stagger` child
  (`asChild`).
- `Stagger` — sequences variant-aware children; sequencing lives on the parent
  so grids need no per-item delay math.
- `RevealText` — word-by-word heading reveal. Each word is clipped by an
  `overflow-hidden` span; the separating space is a text node in the parent so
  the heading's accessible name stays a normal sentence.
- `Marquee` — CSS-only seamless track (content duplicated, translate -50%).
- `Magnetic` — spring-damped pull toward the cursor for primary CTAs.
- `SpotlightCard` — pointer-tracked radial glow via CSS custom properties.
- `Counter` — count-up on view, final value server-rendered.
- `Parallax` — spring-smoothed scroll translate.
- `ScrollProgress` — reading-progress line in the header.

See also `accessibility.md`.

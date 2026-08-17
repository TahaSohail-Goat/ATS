# Animation Guidelines

Framer Motion is used for intentional, purposeful motion — not decoration
for its own sake.

- Prefer subtle, fast transitions (150-300ms) for UI feedback (hover,
  open/close).
- Page/section entrance animations should be brief and not block content
  from being usable while animating.
- Always respect `prefers-reduced-motion` (see `accessibility.md`) —
  provide a non-animated fallback.
- Avoid animating properties that trigger layout thrashing (animate
  `transform`/`opacity`, not `width`/`top`/`left`, where possible).

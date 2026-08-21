# ATS Design System

The current frontend-first ATS website uses semantic tokens and a deliberately
small component surface. Colours, spacing, radii, typography, and motion tokens
live in `packages/ui/src/tokens`.

## Architecture

- `apps/web` owns route/page-specific compositions.
- `packages/ui` owns reusable brand primitives (`Button`, `Badge`, `Card`,
  `Input`, `Textarea`) and tokens.
- There is no API/database package in the current phase.
- Contact submissions use an optional external hosted form endpoint.

## Performance-sensitive visual rules

- Prefer semantic Tailwind roles (`bg-ats-surface`, `text-ats-ink-muted`,
  `border-ats-line`) over raw palette values.
- Do not fade text with opacity modifiers; it breaks the AA token guarantee.
- Use gradients and hairlines sparingly. Avoid stacking large blur layers,
  backdrop filters, SVG turbulence, and scroll-linked animation.
- Keep above-the-fold fonts explicit in `app/layout.tsx`: Inter preloads with
  declared weights; JetBrains Mono is below-the-fold and is not preloaded.
- `Aurora` is CSS-only and static outside the hero. `Reveal` remains the
  primary content motion primitive.

For the complete visual language, component inventory, themes, logo assets, and
accessibility rules, see this file's history and
`website-design-brief.md`, `accessibility.md`, `responsive-design.md`, and
`animation-guidelines.md`.

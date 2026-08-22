# ATS Design System

The ATS website uses semantic tokens and a deliberately refined component surface. Colours, spacing, radii, typography, and motion tokens live in `src/ui/tokens/`.

## Architecture

- `src/pages/` and `src/features/` own route/page-specific compositions.
- `src/ui/` owns reusable brand primitives (`Button`, `Badge`, `Card`, `Input`, `Textarea`) and tokens.
- Instant SPA routing via React Router.

## Performance-sensitive visual rules

- Prefer semantic Tailwind roles (`bg-ats-surface`, `text-ats-ink-muted`, `border-ats-line`) over raw palette values.
- Do not fade text with opacity modifiers; it breaks the AA token guarantee.
- Use gradients and hairlines sparingly. Avoid stacking unoptimized blur layers and heavy filters.
- Typography: Inter (primary display and body) & JetBrains Mono (monospace details and numbers).
- `Aurora` is CSS-only and GPU-accelerated. `Reveal` and `Stagger` remain the primary content motion primitives.

For the visual language, themes, logo assets, and accessibility rules, see `website-design-brief.md`, `accessibility.md`, `responsive-design.md`, and `animation-guidelines.md`.

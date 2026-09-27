# AST Design System

The AST website uses semantic tokens and a deliberately refined component surface. Colours, spacing, radii, typography, and motion tokens live in `src/ui/tokens/`.

## Architecture

- `src/pages/` and `src/features/` own route/page-specific compositions.
- `src/ui/` owns reusable brand primitives (`Button`, `Badge`, `Card`, `Input`, `Textarea`) and tokens.
- Instant SPA routing via React Router.

## Performance-sensitive visual rules

- Prefer semantic Tailwind roles (`bg-ast-surface`, `text-ast-ink-muted`, `border-ast-line`) over raw palette values.
- Do not fade text with opacity modifiers; it breaks the AA token guarantee.
- Use gradients and hairlines sparingly. Avoid stacking unoptimized blur layers and heavy filters.
- Typography: Inter (primary display and body) & JetBrains Mono (monospace details and numbers).
- `Aurora` is CSS-only and GPU-accelerated. `Reveal` and `Stagger` remain the primary content motion primitives.

## Headings

Display headings (`text-display-md` for sections, `text-display-lg` for page and
hero titles) are always `font-bold`. The weight lives on the element, not in the
token, because a `font-*` class always wins over the size token's weight.

## Dark bands and dark cards in the light theme

The light theme is a dark-and-white composition, not a uniformly pale page, on
every route. Openers and closers are dark bands: the home hero, every
`PageHero`, the photo `Section` bands (`image`), `CtaSection`, the process band,
the Contact page and the 404 page. Content sits on light sections as dark cards:
`ServiceCard`, `ProjectCard`, `TeamCard`, the mission/vision and problem/solution
cards, the client quote and the FAQ rows. The footer stays light.

The semantic tokens are scoped to the `.dark` class (see `tailwind.config.ts`),
so putting `dark` on any element re-scopes every token inside it, including the
photo scrims. It does nothing in the dark theme. Rules when you do it:

- Add `text-ast-ink` to the same element. Plain text inherits its colour from
  `<body>`, which was resolved in the light theme, so without it inherited text
  stays dark-on-dark.
- Give a band that has a photo a base `bg-ast-canvas` as well. On small screens
  a photo may cover only part of the band, and the rest would otherwise show the
  light page colour behind light text (`Section` does this).
- `dark:` variants only match descendants of a `.dark` element, never the element
  itself, so do not put a `dark:` class on the element that carries `dark`.
- Do not lay text over a photo's bright areas: the service photos carry their own
  lettering, so `ServiceCard` puts its title below the photo, not over it.

Card copy is `text-base` (16px) in `text-ast-ink-muted`. On dark surfaces that
token is `#BFCADC` (about 11.7:1), deliberately brighter than plain AA so card
text reads crisply; titles stay in `text-ast-ink`. Cards carry no ordinal
numbering (no "01", "02" badges): the order is the layout.

Every text run on every route measures at least WCAG AA (4.5:1, or 3:1 for large
text) in both themes at 390, 768, 1024 and 1440px.

For the visual language, themes, logo assets, and accessibility rules, see `website-design-brief.md`, `accessibility.md`, `responsive-design.md`, and `animation-guidelines.md`.

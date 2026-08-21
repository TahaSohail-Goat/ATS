# ATS Design System

Single source of truth for brand visuals. Implemented as design tokens in
`packages/ui/src/tokens` — never hardcode these values in app code.

## Colors

### Brand palette

`packages/ui/src/tokens/colors.ts` → `colors`

| Role             | Name          | Hex       | Usage                                               |
| ---------------- | ------------- | --------- | --------------------------------------------------- |
| Primary          | Deep Navy     | `#0B1220` | Deep surface, shadow tinting                        |
| Secondary        | Navy Blue     | `#172554` | Secondary surfaces, project cover gradients         |
| Brand            | Electric Blue | `#2563EB` | Primary actions, links, brand accents               |
| Brand (bright)   | Electric Blue | `#3B82F6` | Brand role on dark surfaces                         |
| Brand (soft)     | Electric Blue | `#60A5FA` | Hover state on dark surfaces                        |
| Brand (deep)     | Electric Blue | `#1D4ED8` | Hover/pressed state on light surfaces               |
| Accent           | Cyan          | `#06B6D4` | Decorative fills and dark-surface gradients         |
| Accent (bright)  | Cyan          | `#22D3EE` | Accent role on dark surfaces                        |
| Accent (deep)    | Cyan          | `#0E7490` | Accent role on light surfaces — plain cyan is 2.3:1 |
| Violet           | Violet        | `#7C3AED` | Third gradient stop only — never a solid fill       |
| Light Background | Off White     | `#F8FAFC` | Light-scheme page background                        |
| Dark Background  | Near Black    | `#020617` | Dark-scheme page background (default)               |
| Surface (light)  | White         | `#FFFFFF` | Light-scheme card surface                           |
| Surface (dark)   | —             | `#080D1C` | Dark-scheme card surface                            |
| Line (light)     | —             | `#E2E8F0` | Light-scheme hairline/border                        |
| Line (dark)      | —             | `#1B2438` | Dark-scheme hairline/border                         |
| Main Text        | Slate         | `#0F172A` | Primary text on light backgrounds                   |
| Muted Text       | Gray          | `#64748B` | Decorative/icon use on light backgrounds            |
| Muted (deep)     | Gray          | `#475569` | Muted _text_ on light backgrounds (AA on raised)    |
| Text on dark     | —             | `#E6EDF8` | Primary text on dark backgrounds                    |
| Muted on dark    | —             | `#93A3BC` | Secondary text on dark backgrounds                  |
| Success          | Green         | `#22C55E` | Success states, confirmations                       |
| Error            | Red           | `#EF4444` | Errors, destructive actions                         |

### Semantic roles — use these in components

`colors.ts` → `theme` maps the palette onto scheme-aware roles.
`apps/web/tailwind.config.ts` emits each role as a CSS custom property holding
an `R G B` triplet, so every Tailwind color utility keeps opacity modifiers
(`bg-ats-surface/60`) and one class on `<html>` re-themes the whole site.

| Tailwind class       | CSS variable           | Role                               |
| -------------------- | ---------------------- | ---------------------------------- |
| `ats-canvas`         | `--ats-canvas`         | Page background                    |
| `ats-surface`        | `--ats-surface`        | Card / panel background            |
| `ats-surface-raised` | `--ats-surface-raised` | Inset and raised surfaces, inputs  |
| `ats-line`           | `--ats-line`           | Hairlines, borders, dividers       |
| `ats-ink`            | `--ats-ink`            | Primary text                       |
| `ats-ink-muted`      | `--ats-ink-muted`      | Secondary text                     |
| `ats-brand`          | `--ats-brand`          | Primary actions and links          |
| `ats-brand-strong`   | `--ats-brand-strong`   | Hover/pressed brand state          |
| `ats-accent`         | `--ats-accent`         | Highlights, eyebrows, icon accents |
| `ats-primary`        | `--ats-primary`        | Fixed deep navy (shadow tints)     |
| `ats-secondary`      | `--ats-secondary`      | Fixed navy (cover gradients)       |
| `ats-violet`         | `--ats-violet`         | Fixed violet (third gradient stop) |
| `ats-success`        | `--ats-success`        | Success states                     |
| `ats-error`          | `--ats-error`          | Error states                       |

Rule: components use the semantic classes. Reach for a palette name only
when the value must not change between schemes (e.g. a cover gradient).

All text/background pairings must meet WCAG AA contrast (4.5:1 body, 3:1
large text) — see `accessibility.md`. This is enforced:
`apps/web/src/lib/token-contrast.test.ts` asserts every semantic pairing in
both schemes, so retuning a role fails the test suite rather than shipping.

Consequence for authoring: **do not fade text with an opacity modifier**
(`text-ats-ink-muted/70`). Opacity defeats the token contrast guarantee.
Reserve opacity for borders, backgrounds, decorative glyphs, and
`aria-hidden` ornament; if text needs to recede, use `ats-ink-muted` at full
strength.

## Typography

- **Sans:** Inter via `next/font` (`--font-inter`). Body and headings.
- **Mono:** JetBrains Mono via `next/font` (`--font-mono`). Numerals, indices,
  and technical labels — it carries the "engineering" signal so the sans face
  can stay neutral.
- **Fluid display scale** (`tailwind.config.ts` → `fontSize`): `display-sm`,
  `display-md`, `display-lg`, `display-xl` use `clamp()` so headlines track
  the viewport and read intentionally at 375px and at 1920px.
  - `display-xl` — homepage `h1` only
  - `display-lg` — interior page `h1`
  - `display-md` — section `h2`
  - `eyebrow` — 11px, `0.2em` tracking, uppercase labels
- Body copy stays on Tailwind's default scale (`text-sm`/`base`/`lg`).
- **Tracking:** `tracking-display` (-0.045em) on `h1`–`h3` (applied globally in
  `globals.css`), `tracking-tighter2` (-0.03em) on card titles.
- `text-balance` on headings and `text-wrap: pretty` on paragraphs prevent
  orphans without manual line breaks.

## Spacing, radius, elevation

- Spacing: Tailwind's default 4px scale.
- Section rhythm: `Section`'s `space` prop (`tight` / `base` / `loose`) — do
  not hand-roll vertical padding.
- Radius: `rounded-full` for controls, pills, and buttons; `rounded-xl` for
  inputs and small icon tiles; `rounded-4xl` (2rem) for cards and panels.
- Shadows (`boxShadow` in the Tailwind config): `ats-card` (subtle),
  `ats-lifted` (hover elevation), `ats-glow` (brand-tinted focus/CTA),
  `ats-inset` (top highlight on dark surfaces). Elevation on dark surfaces
  comes primarily from borders and brand-tinted glows, not black shadows.

## Surface utilities

Defined in `apps/web/src/styles/globals.css`, all token-driven:

| Class               | Purpose                                                   |
| ------------------- | --------------------------------------------------------- |
| `ats-grid`          | Masked engineering grid for hero/cover surfaces           |
| `ats-dots`          | Masked dot field for secondary bands                      |
| `ats-grain`         | Film grain overlay — prevents banding on wide gradients   |
| `ats-glass`         | Blurred translucent panel (header, floating chips)        |
| `ats-hairline`      | 1px gradient divider                                      |
| `ats-ring-gradient` | Gradient border via mask compositing, no wrapper element  |
| `ats-text-gradient` | Brand gradient text (ink → accent → brand)                |
| `ats-fade-x`        | Horizontal edge fade for marquees                         |
| `ats-spotlight`     | Pointer-tracked radial glow (paired with `SpotlightCard`) |

## Components

### `packages/ui` (brand primitives)

- `Button` — variants `primary` / `secondary` / `outline` / `subtle` /
  `ghost`; sizes `sm` / `md` / `lg` / `xl`; `asChild` to render a `Link`;
  `fullWidth`.
- `Badge` — tones `neutral` / `brand` / `accent` / `success` / `error`,
  optional status `dot`.
- `Card` — neutral surface with optional `interactive` hover elevation.
- `Input` / `Textarea` — form controls with an `invalid` state. Always paired
  with a `<label>` at the call site.
- `cn()` — dependency-free class-name joiner.

### `apps/web/src/components` (site-specific)

`Container`, `Section`, `SectionHeading`, `PageHero`, `Aurora`, `Header`,
`Footer`, `Logo`, `ThemeToggle`, `CtaSection`, `ServiceCard`, `ProjectCard`,
`ArrowLink`, `ProcessTimeline`, plus the motion primitives in
`components/motion/` (see `animation-guidelines.md`).

## Dark mode / light mode

- **Dark is the default scheme.** `:root` carries the dark token values;
  `.light` on `<html>` overrides them.
- `ThemeToggle` persists the choice in `localStorage` (`ats-theme`) and an
  inline script in `app/layout.tsx` applies it before first paint, so there is
  no flash. Theme state is read from the document via `useSyncExternalStore`
  (`src/lib/theme.ts`) rather than mirrored into React state.
- Tailwind's `dark:` variant remains available (the `dark` class is set
  alongside), but semantic tokens should make it unnecessary.

## Logo / Favicon

**Source of truth:** `apps/web/public/brand/ats-logo.jpeg` — a 1254×1254
square mark. Two properties drive how it is used:

- It has the brand's near-black background **baked in** (JPEG, no alpha), so it
  is always presented as a rounded tile with a hairline border, never
  composited onto a page surface. On the dark canvas the tile background is all
  but identical to the page; in light mode it reads as an app icon.
- It contains **no lettering**, so the "ATS" wordmark rendered beside it in
  `Logo` is type, not a duplicate of the artwork.

Derived assets are generated from that one file and committed:

| Asset                         | Size     | Purpose                        |
| ----------------------------- | -------- | ------------------------------ |
| `src/app/icon.png`            | 128×128  | Favicon (Next file convention) |
| `src/app/apple-icon.png`      | 180×180  | Apple touch icon               |
| `src/app/opengraph-image.png` | 1200×630 | Social card (also used for X)  |

Next.js emits the `<link rel="icon">`, `<link rel="apple-touch-icon">`, and
`og:image` / `twitter:image` tags from those filenames — do not hand-write
those tags in `metadata`.

Regenerate after changing the source logo:

```bash
cd apps/web && node scripts/generate-brand-assets.mjs
```

The script composes the social card from the same design tokens as the site and
renders via Playwright's Chromium (already a dev dependency), so no
image-processing dependency is added for a run-once task. Wiring is covered by
`apps/web/e2e/brand.spec.ts`.

See also `accessibility.md`, `responsive-design.md`,
`animation-guidelines.md`, `website-design-brief.md`.

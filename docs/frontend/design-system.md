# ATS Design System

Single source of truth for brand visuals. Implemented as design tokens in
`packages/ui/src/tokens` — never hardcode these values in app code.

## Colors

| Role             | Name          | Hex       | Usage                                               |
| ---------------- | ------------- | --------- | --------------------------------------------------- |
| Primary          | Deep Navy     | `#0B1220` | Primary dark surface / high-emphasis text on light  |
| Secondary        | Navy Blue     | `#172554` | Secondary surfaces, headers                         |
| Brand            | Electric Blue | `#2563EB` | Primary actions, links, brand accents               |
| Accent           | Cyan          | `#06B6D4` | Highlights, secondary accents, gradients with Brand |
| Light Background | Off White     | `#F8FAFC` | Default light-mode page background                  |
| Dark Background  | Near Black    | `#020617` | Default dark-mode page background                   |
| Main Text        | Slate         | `#0F172A` | Primary text on light backgrounds                   |
| Muted Text       | Gray          | `#64748B` | Secondary/help text                                 |
| Success          | Green         | `#22C55E` | Success states, confirmations                       |
| Error            | Red           | `#EF4444` | Errors, destructive actions                         |

All text/background color pairings must meet WCAG AA contrast (4.5:1 for
body text, 3:1 for large text) — see `accessibility.md`.

## Typography

- System font stack via `next/font` (e.g. Inter or similar geometric
  sans) — final family is a design decision, load via `next/font` for
  performance either way.
- Type scale: `text-sm` (14px) / `text-base` (16px) / `text-lg` (18px) /
  `text-xl`–`text-4xl` for headings, following Tailwind's default scale
  unless a documented reason overrides it.

## Spacing & Radius

- Spacing: Tailwind's default 4px-based scale (`1` = 4px, `2` = 8px, ...).
- Border radius: `rounded-md` (6px) default for inputs/buttons,
  `rounded-lg`/`rounded-xl` for cards, `rounded-full` for avatars/pills.

## Shadows

- `shadow-sm` for subtle elevation (cards on light background)
- `shadow-md`/`shadow-lg` for popovers, modals, dropdowns
- Avoid heavy shadows in dark mode — prefer border/contrast for separation.

## Components (packages/ui)

Buttons, Cards, Inputs, Navigation, and other shadcn/ui-based primitives are
themed with the tokens above. Component-specific guidance lives alongside
each component in `packages/ui/src/components`.

## Dark mode / Light mode

- Light mode: Off White background, Slate text, Electric Blue accents.
- Dark mode: Near Black / Deep Navy background, Off White text, Cyan/
  Electric Blue accents for sufficient contrast against dark surfaces.
- Implemented via Tailwind's `dark:` variant, driven by
  `prefers-color-scheme` with a manual override toggle (component TBD).

## Logo / Favicon

**TBD:** final logo files and favicon/app-icon set are a design asset
deliverable, not yet produced. Once available, place source files under
`apps/web/public/brand/` and reference from `apps/web/src/app/` metadata
and `packages/ui/src/tokens`.

See also `accessibility.md`, `responsive-design.md`,
`animation-guidelines.md`.

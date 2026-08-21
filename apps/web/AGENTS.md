# AGENTS.md — apps/web (Next.js frontend)

Extends the root `AGENTS.md`. The current repository phase is a frontend-first
portfolio; there is no local API or database.

## Scope

Public ATS website. App Router only (`src/app`). No `pages/` directory.

## Structure

```
src/
  app/               Routes, layouts, metadata
  features/          Feature-scoped UI (e.g. contact-form/)
  components/        Cross-route site components
  components/motion/ Lightweight reveal primitives
  data/              Static site content
  lib/               Motion vocabulary and theme helpers
  styles/            Global CSS and Tailwind entry point
```

## Rules

- Server Components by default; use client components only for menu state,
  theme selection, and purposeful Framer Motion choreography.
- Static content stays in `src/data`; do not add an API/database for it.
- The contact form is a native POST to the optional
  `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`; never add raw fetch calls or a local
  persistence layer for this phase.
- Every route defines metadata and uses the semantic ATS design tokens.
- Do not fade text with opacity modifiers; token contrast is asserted by
  `src/lib/token-contrast.test.ts`.
- Avoid global scroll listeners, per-card pointer handlers, continuous blur or
  grain repainting, and scroll-linked parallax. See
  `docs/frontend/animation-guidelines.md`.
- Keep the source logo in `public/brand/`; regenerate derived icons/social
  assets with `scripts/generate-brand-assets.mjs`.

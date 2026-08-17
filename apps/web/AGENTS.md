# AGENTS.md — apps/web (Next.js frontend)

Extends the root `AGENTS.md`. Read that first.

## Scope
Public ATS website. App Router only (`src/app`). No `pages/` directory.

## Structure
```
src/
  app/          Routes, layouts, metadata (thin — no business logic here)
  features/     Feature-scoped UI + logic (e.g. features/contact-form/)
  components/   Cross-feature, app-specific components (not brand primitives)
  lib/          API client, utilities, config parsing
  hooks/        Shared React hooks
  styles/       Global CSS, Tailwind entry point
```
Brand-level primitives (Button, Card, Input, design tokens) live in
`packages/ui`, not here. If a component is generic enough to belong in the
design system, propose moving it there rather than growing `components/`.

## Rules
- Server Components by default; add `"use client"` only when the component
  needs interactivity, state, or browser APIs.
- Data fetching from the API goes through `src/lib/api-client`, never raw
  `fetch` scattered across components.
- All forms use React Hook Form + Zod resolvers, using shared schemas from
  `packages/validation` where the shape is also used server-side.
- Every route must define metadata (title, description) — see
  `docs/frontend/design-system.md` and `docs/requirements/non-functional-requirements.md`
  (SEO section).
- Respect the ATS design tokens in `packages/ui/src/tokens` — no hardcoded
  hex colors in components.
- Images use `next/image`; fonts use `next/font`.
- New pages require: a route file, metadata, and (if interactive) a
  Playwright smoke test in `apps/web/e2e/`.

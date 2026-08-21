# AGENTS.md — apps/web (Next.js frontend)

Extends the root `AGENTS.md`. Read that first.

## Scope

Public ATS website. App Router only (`src/app`). No `pages/` directory.

## Structure

```
src/
  app/               Routes, layouts, metadata (thin — no business logic here)
  features/          Feature-scoped UI + logic (e.g. features/contact-form/)
  components/        Cross-feature, app-specific components (not brand primitives)
  components/motion/ Motion primitives (Reveal, Stagger, Marquee, …)
  data/              Static site content (services, projects, navigation, …)
  lib/               API client, motion vocabulary, theme store, utilities
  hooks/             Shared React hooks
  styles/            Global CSS, Tailwind entry point
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
  hex colors in components. Use the **semantic** Tailwind classes
  (`bg-ats-surface`, `text-ats-ink-muted`, `border-ats-line`), not raw palette
  names, so light/dark both stay correct.
- Never fade text with an opacity modifier (`text-ats-ink-muted/70`) — it
  breaks the AA contrast guarantee asserted in
  `src/lib/token-contrast.test.ts`. Opacity is for borders, backgrounds, and
  `aria-hidden` ornament only.
- Build layout from `Section` / `SectionHeading` / `PageHero` / `Container`
  rather than hand-rolling vertical padding or heading blocks.
- Animate only through the primitives in `components/motion/` and the timings
  in `src/lib/motion.ts`. Every animation needs a reduced-motion fallback that
  renders the _finished_ state — see `docs/frontend/animation-guidelines.md`.
- Effects that need no React state (marquees, gradient backdrops) stay CSS-only
  Server Components. Do not add a client boundary for decoration.
- Design intent and content-honesty rules live in
  `docs/frontend/website-design-brief.md` — placeholder testimonials and
  illustrative projects must stay visibly labelled.
- Brand assets: the only source logo is `public/brand/ats-logo.jpeg`. Icons and
  the social card are generated from it by
  `scripts/generate-brand-assets.mjs` — regenerate rather than hand-editing the
  PNGs, and let Next's file conventions emit the icon/OG tags.
- Images use `next/image`; fonts use `next/font`.
- New pages require: a route file, metadata, and (if interactive) a
  Playwright smoke test in `apps/web/e2e/`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

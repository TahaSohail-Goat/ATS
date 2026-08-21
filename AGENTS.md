# AGENTS.md — ATS Portfolio Instructions

This repository currently contains the ATS public portfolio/company website.
The frontend is the product in this phase. Do not add backend, database,
authentication, queues, or other runtime services unless the user requests a
concrete product requirement and an ADR is written first.

## Technology stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion
- Forms: native HTML POST to an optional hosted form provider
- Shared UI: `packages/ui`
- Monorepo tooling: pnpm workspaces + Turborepo
- Testing: Vitest and Playwright

## Repository map

```
apps/
  web/        Next.js portfolio/company website
packages/
  ui/         Shared design primitives and ATS tokens
  config/     Shared ESLint/TypeScript configuration
docs/         Product, frontend, security, testing, and deployment guidance
```

## Architecture rules

- App Router only. Server Components by default.
- Static project/service content belongs in `apps/web/src/data`.
- Reusable brand primitives belong in `packages/ui`; page compositions belong
  in `apps/web`.
- Use semantic design tokens, not hardcoded brand hex values.
- Keep client boundaries small. Avoid global scroll listeners, per-card pointer
  handlers, scroll-linked parallax, continuous SVG grain, and stacked large
  blur layers. See `docs/frontend/animation-guidelines.md`.
- The contact form may use `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` to POST to a
  hosted provider. It must not persist visitor data locally.
- Every route needs metadata, accessible labels/focus states, responsive
  layouts, and reduced-motion fallbacks.

## Change protocol

Understand → Inspect → Plan → Implement → Test → Review → Document.

Run the relevant checks after changes:

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

If persistent leads, admin tools, email automation, CRM integration, accounts,
or authenticated products become requirements, stop and document the new
architecture before implementing it.

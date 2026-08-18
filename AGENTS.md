# AGENTS.md — ATS Repository Instructions for AI Coding Agents

This file is the primary instruction manual for any AI coding agent (or human
acting like one) working inside this repository. Read this file in full
before making any change. More specific `AGENTS.md` files exist deeper in the
tree (see "Agent Hierarchy" below) — they extend, not replace, this one.

If anything you are asked to do conflicts with this document, **stop and ask
for clarification instead of guessing.**

---

## 1. Repository Identity

- **Company:** ATS — AI Software and Technology Solutions
- **This repository:** the monorepo foundation for ATS's public website and
  future products (SaaS, AI products, client work, internal tools).
- **Current product:** the ATS marketing/company website (`apps/web`) and its
  supporting API (`apps/api`).
- **Long-term shape:** a modular monorepo that can grow into a multi-app
  platform (admin dashboards, customer portals, docs sites, additional
  services) without being restructured. New apps are added under `apps/`;
  shared logic is extracted into `packages/` only once it is actually shared.
- **Architecture style:** modular monolith backend + Next.js frontend, not
  microservices. Do not introduce microservices, message queues, or new
  runtime services without an ADR (see §9).

Full context: `docs/product/vision.md`, `docs/architecture/system-architecture.md`.

---

## 2. Technology Stack (do not change without an ADR)

| Layer            | Choice                                                                          |
| ---------------- | ------------------------------------------------------------------------------- |
| Frontend         | Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion |
| Forms/validation | React Hook Form + Zod                                                           |
| Data fetching    | TanStack Query                                                                  |
| Backend          | Node.js, Express.js, TypeScript, Zod                                            |
| Database         | PostgreSQL via Prisma                                                           |
| Monorepo tooling | pnpm workspaces + Turborepo                                                     |
| Testing          | Vitest (unit/integration), Playwright (E2E)                                     |
| Infra (local)    | Docker Compose (Postgres only, currently)                                       |

---

## 3. Repository Map

```
apps/
  web/        Next.js frontend — public website
  api/        Express backend — modular monolith
packages/
  ui/         Shared design-system components + tokens (ATS brand)
  config/     Shared eslint/typescript/tailwind config
  types/      Shared TypeScript types/interfaces
  validation/ Shared Zod schemas usable by both web and api
docs/         Source of truth for product, architecture, decisions
.github/      CI/CD workflows, issue/PR templates, CODEOWNERS
```

Do not put backend code in `apps/web` or frontend code in `apps/api`.
Cross-cutting logic that both need (e.g. a Zod schema for the contact form)
belongs in `packages/validation` or `packages/types`, not duplicated in both.

---

## 4. Architecture Rules

- **Frontend:** App Router only. Feature/domain-oriented folders inside
  `src/features/*`, not one giant `src/components` dump. Shared, brand-level
  UI primitives live in `packages/ui`; page/feature-specific components stay
  local to the feature. See `apps/web/AGENTS.md`.
- **Backend:** modules are organized by business domain
  (`src/modules/<domain>`), each with its own `routes|controller`, `service`,
  `repository`, `schema`, `types`, and `tests`. See `apps/api/AGENTS.md`.
- **Database:** all schema changes go through Prisma migrations. No hand-edited
  SQL against dev/staging/prod outside of migrations. Every model must have a
  documented business purpose in `docs/database/schema.md`.
- **API:** REST under `/api/v1`. Breaking changes require a new version or an
  ADR — never silently change a response shape or status code.
- **Auth:** implement only what current requirements need (see
  `docs/security/authentication.md`). Do not pre-build auth flows that
  aren't yet required.
- **Configuration:** environment variables are typed and validated at startup
  (Zod) in each app; never read `process.env` ad hoc deep in business logic.

---

## 5. Coding Rules

- **TypeScript:** `strict: true` everywhere. No `any` without a comment
  explaining why. Prefer explicit return types on exported functions.
- **Naming:** `camelCase` for variables/functions, `PascalCase` for
  components/types/classes, `kebab-case` for file and folder names except
  React component files, which are `PascalCase.tsx`.
- **Folders:** domain/feature-first, not type-first. Prefer
  `features/contact/ContactForm.tsx` over `components/ContactForm.tsx` mixed
  with fifty unrelated components.
- **API conventions:** see `docs/api/conventions.md` — standardized response
  envelope, error format, pagination, and status codes. Follow it exactly.
- **Database conventions:** see `docs/database/schema.md` — every table has
  `id`, `createdAt`, `updatedAt`; soft-delete only where documented.
- **Error handling:** throw typed errors from `apps/api/src/shared/errors`;
  let the centralized error middleware format the response. Never leak stack
  traces or internal details to clients.
- **Logging:** use the shared structured logger
  (`apps/api/src/shared/logger`). No `console.log` in committed code.
- **Validation:** all external input (API bodies, query params, form
  submissions) is validated with Zod before use. Never trust client input.
- **Security:** never disable Helmet, CORS restrictions, or rate limiting to
  "make something work." Fix the actual cause.
- **Testing:** co-locate tests next to the code they test
  (`*.test.ts` / `*.spec.ts`). New behavior requires new/updated tests.

---

## 6. AI Agent Rules

1. **Always inspect existing architecture before changing code.** Read the
   relevant `AGENTS.md` and the related `docs/` pages first.
2. **Never rewrite working architecture unnecessarily.** Prefer the smallest
   change that satisfies the requirement.
3. **Never introduce a new dependency without justification** — state why in
   the PR description and, if it's a significant addition (new framework,
   new infra), write an ADR first.
4. **Never duplicate existing functionality.** Search the monorepo (including
   `packages/`) before writing something that may already exist.
5. **Never modify environment secrets** (`.env`, secret store values). Only
   edit `.env.example` to document new _variable names_ with placeholder
   values.
6. **Never expose API keys or secrets** in code, logs, comments, or commit
   messages.
7. **Never bypass validation** to get a feature working faster.
8. **Never bypass or delete tests to make CI pass.** If a test is genuinely
   wrong, fix or replace it and explain why in the PR.
9. **Never silently change API contracts.** Update `docs/api/` and bump the
   version if a breaking change is required.
10. **Never make destructive database changes** (dropping columns/tables,
    irreversible data transforms) without a migration plan documented in
    `docs/database/migrations.md` and, for anything non-trivial, an ADR.
11. **Always update documentation when architecture changes.**
12. **Always add or update tests when behavior changes.**
13. **Always follow existing patterns** in the module/feature you're editing
    over introducing a new pattern.
14. **Ask for clarification when requirements conflict** rather than picking
    an interpretation silently.
15. **Prefer small, reviewable changes** over large multi-concern PRs.
16. **Preserve backward compatibility** where reasonably possible.

---

## 7. AI Change Protocol

Follow this sequence for any non-trivial change:

```
Understand → Inspect → Plan → Implement → Test → Review → Document
```

1. **Understand** — restate the actual requirement; identify ambiguity.
2. **Inspect** — read the relevant code, `AGENTS.md`, and `docs/` pages.
3. **Plan** — outline the change (files touched, migrations, doc updates)
   before writing code. For architectural changes, this plan may need to
   become an ADR (`docs/decisions/`).
4. **Implement** — make the smallest change that satisfies the plan,
   following existing conventions.
5. **Test** — add/update unit, integration, or E2E tests as appropriate;
   run `pnpm lint && pnpm typecheck && pnpm test`.
6. **Review** — re-read the diff as if reviewing someone else's PR; check
   against §5 and §6.
7. **Document** — update `docs/` and any local `README`/`AGENTS.md` affected.

---

## 8. Agent Hierarchy

Scoped instructions extend (never duplicate) this file:

```
AGENTS.md                    ← you are here (global rules)
apps/web/AGENTS.md           ← frontend-specific rules
apps/api/AGENTS.md           ← backend-specific rules
packages/ui/AGENTS.md        ← design-system rules
packages/config/AGENTS.md    ← shared tooling config rules
docs/AGENTS.md               ← documentation authoring rules
```

When working inside a subdirectory, read its `AGENTS.md` in addition to this
one. If they ever appear to conflict, this root file wins — flag the
conflict instead of silently resolving it.

---

## 9. When an ADR Is Required

Write an Architecture Decision Record (`docs/decisions/`, template at
`docs/decisions/ADR-0001-template.md`) before, not after, doing any of:

- Changing database technology or ORM
- Changing the frontend framework or rendering strategy
- Introducing Redis, a queue, or any new infrastructure service
- Introducing microservices or splitting the modular monolith
- Changing the authentication approach
- Adding an external AI/LLM provider
- Changing deployment architecture or hosting provider

---

## 10. Where to Find Things

- Product context → `docs/product/`
- Requirements → `docs/requirements/`
- Architecture → `docs/architecture/`
- API conventions → `docs/api/conventions.md`
- Database schema → `docs/database/schema.md`
- Security rules → `docs/security/`
- Testing strategy → `docs/development/testing.md`
- Deployment → `docs/deployment/`
- AI-agent deep dives → `docs/ai/`
- Design tokens/brand → `docs/frontend/design-system.md` and
  `packages/ui/src/tokens`

If something is undocumented, that is a gap — flag it, don't invent a
decision on the startup's behalf.

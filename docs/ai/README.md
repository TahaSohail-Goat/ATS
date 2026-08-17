# AI Agent Documentation

This section is the deep-dive companion to the root `AGENTS.md`. Read the
root file first — it has the authoritative, load-bearing rules. These pages
expand on specific workflows.

- [`agent-workflow.md`](./agent-workflow.md)
- [`coding-rules.md`](./coding-rules.md)
- [`architecture-rules.md`](./architecture-rules.md)
- [`testing-rules.md`](./testing-rules.md)
- [`documentation-rules.md`](./documentation-rules.md)
- [`security-rules.md`](./security-rules.md)
- [`change-management.md`](./change-management.md)

## Quick answers

> **What is this project?** ATS's monorepo: a Next.js marketing site
> (`apps/web`) + Express API (`apps/api`), modular monolith backend,
> shared packages, docs-as-source-of-truth. See root `AGENTS.md` §1.

> **What am I allowed to modify?** Anything except secrets/`.env` values
> (edit `.env.example` only) — see root `AGENTS.md` §6.

> **Where should this feature be implemented?** Frontend UI →
> `apps/web/src/features/<feature>`. Backend logic → a module under
> `apps/api/src/modules/<domain>`. Shared types/validation →
> `packages/types` / `packages/validation`. Brand UI primitives →
> `packages/ui`.

> **Which architecture should I follow?** Whatever is already established
> in the module/feature you're touching (root `AGENTS.md` §6.13). For new
> areas, follow `apps/web/AGENTS.md` or `apps/api/AGENTS.md`.

> **Which tests should I run?** `pnpm lint && pnpm typecheck && pnpm test`
> minimum; add `pnpm test:e2e` for changes touching user-facing flows.

> **Which documentation must I update?** Anything whose description of the
> system your change makes inaccurate — most commonly `docs/architecture/*`,
> `docs/api/conventions.md`, `docs/database/schema.md`, or the relevant
> `AGENTS.md`.

> **What are the security constraints?** `docs/security/security-policy.md`
> plus root `AGENTS.md` §6 (validation, secrets, never bypassing checks).

> **How do I add a new API endpoint?** See `change-management.md` and
> `apps/api/AGENTS.md` — new/updated module files, Zod schema, tests,
> `docs/api/conventions.md` update if it introduces a new pattern.

> **How do I add a new frontend feature?** See `apps/web/AGENTS.md` —
> new folder under `src/features/`, Server Component by default, tests,
> Playwright smoke test if it's a critical flow.

> **How do I modify the database?** Prisma migration (`pnpm db:migrate`),
> update `docs/database/schema.md`, follow
> `docs/database/migrations.md` for anything destructive.

> **How do I create an ADR?** Copy
> `docs/decisions/ADR-0001-template.md`, see `docs/decisions/README.md`.

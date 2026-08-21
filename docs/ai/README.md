# AI Agent Documentation

This section expands the authoritative root `AGENTS.md` for the current
frontend-first portfolio.

- [`agent-workflow.md`](./agent-workflow.md)
- [`coding-rules.md`](./coding-rules.md)
- [`architecture-rules.md`](./architecture-rules.md)
- [`testing-rules.md`](./testing-rules.md)
- [`documentation-rules.md`](./documentation-rules.md)
- [`security-rules.md`](./security-rules.md)
- [`change-management.md`](./change-management.md)

## Quick answers

> **What is this project?** ATS's Next.js portfolio/company website in
> `apps/web`, with shared brand primitives in `packages/ui`.

> **Where should a feature be implemented?** Page-specific UI belongs under
> `apps/web/src/features`; reusable brand primitives belong in `packages/ui`.
> Static project/service copy belongs in `apps/web/src/data`.

> **What is the contact boundary?** The native contact form optionally POSTs to
> `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`. There is no local API or database.

> **Which tests should I run?** `pnpm lint && pnpm typecheck && pnpm test`
> minimum; add `pnpm test:e2e` for user-facing flows.

> **How should motion be added?** Prefer the existing reveal primitives and
> CSS-only effects. Avoid global scroll listeners, per-card pointer handlers,
> continuous filter repaints, and scroll-linked parallax.

> **When is an ADR required?** Before adding an API, database, authentication,
> queue, external runtime service, or changing deployment architecture.

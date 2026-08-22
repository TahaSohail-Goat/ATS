# AI Agent Documentation

This section expands the authoritative root `AGENTS.md` for the ATS portfolio.

- [`agent-workflow.md`](./agent-workflow.md)
- [`coding-rules.md`](./coding-rules.md)
- [`architecture-rules.md`](./architecture-rules.md)
- [`testing-rules.md`](./testing-rules.md)
- [`documentation-rules.md`](./documentation-rules.md)
- [`security-rules.md`](./security-rules.md)
- [`change-management.md`](./change-management.md)

## Quick answers

> **What is this project?** ATS's React portfolio/company website built with Vite in `src/`, with shared brand primitives in `src/ui/`.

> **Where should a feature be implemented?** Page-specific views belong under `src/pages/` and `src/features/`; reusable brand primitives belong in `src/ui/`. Static project/service copy belongs in `src/data/`.

> **Which checks should I run?** `npm run typecheck && npm run build`.

> **How should motion be added?** Prefer the existing reveal primitives (`Reveal`, `Stagger`, `RevealText`) and CSS-only effects.

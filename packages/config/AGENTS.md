# AGENTS.md — packages/config

Extends the root `AGENTS.md`.

## Scope

Shared ESLint, TypeScript, and Tailwind configuration consumed by every app
and package via `extends`.

## Rules

- Changes here affect the entire monorepo — treat as an architectural change.
- Do not loosen `strict` TypeScript settings or disable lint rules globally
  to fix a local problem; fix the local problem or, if the rule is genuinely
  wrong for the whole repo, justify the change in the PR description.

# Coding Standards

See root `AGENTS.md` §5 for the authoritative rules (naming, TypeScript,
error handling, validation, logging, security). This page adds a few
practical notes:

- Run `pnpm lint && pnpm typecheck` before pushing — CI enforces both.
- Formatting is automatic via Prettier (`pnpm format`); do not hand-format
  or argue with the formatter.
- Prefer composition over inheritance; prefer small, pure functions in
  services for testability.
- Comment *why*, not *what* — the code should already say what it does.

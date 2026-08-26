# Coding Standards

See root `AGENTS.md` for the authoritative rules (naming, TypeScript, error handling, accessibility, styling). Practical notes:

- Run `npm run typecheck` before pushing to ensure type safety.
- Prefer composition; keep components focused and reusable.
- Use semantic design tokens (`--ast-*`) via Tailwind classes rather than hardcoded hex colors.
- Comment _why_, not _what_ — write clean, self-documenting code.

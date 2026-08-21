# AGENTS.md — packages/ui

Brand-level React primitives and tokens shared by the ATS website.

## Rules

- Colors, spacing, radii, typography, and motion timings live in `src/tokens`
  and are the single source of truth.
- Never hardcode ATS brand hex values outside `src/tokens/colors.ts`.
- Components stay generic and accessible: keyboard operable, visible focus,
  sufficient contrast, and reduced-motion-safe.
- Keep the package dependency-light. Add a dependency only when a primitive
  cannot reasonably be implemented with the existing React/platform APIs.
- Marketing-site-specific compositions stay in `apps/web`.

# AGENTS.md — packages/ui (ATS design system)

Extends the root `AGENTS.md`.

## Scope

Brand-level, framework-agnostic-where-possible React primitives and design
tokens shared by all apps.

## Rules

- Colors, spacing, radii, shadows, and typography scale live in
  `src/tokens/` and are the single source of truth — see
  `docs/frontend/design-system.md`. Never hardcode ATS brand hex values
  outside `src/tokens/colors.ts`.
- Components here must be generic and reusable across apps. If something is
  specific to the marketing site, it belongs in `apps/web/src/features`,
  not here.
- Every component must meet the accessibility bar in
  `docs/frontend/accessibility.md` (keyboard operable, visible focus,
  sufficient contrast, respects `prefers-reduced-motion`).
- Breaking changes to a component's public props require a changeset entry
  and, if widely used, a heads-up in the PR description of downstream impact.

# AGENTS.md — packages/ui (ATS design system)

Extends the root `AGENTS.md`.

## Scope

Brand-level, framework-agnostic-where-possible React primitives and design
tokens shared by all apps.

## Rules

- Colors, spacing, radii, and motion timings live in `src/tokens/` and are the
  single source of truth — see `docs/frontend/design-system.md`. Never hardcode
  ATS brand hex values outside `src/tokens/colors.ts`.
- `colors.ts` exports three things: `colors` (the brand palette), `theme`
  (semantic roles per color scheme), and `themeConstant` (roles that do not
  change between schemes). `apps/web/tailwind.config.ts` turns the latter two
  into CSS custom properties — add a role there, not in app CSS.
- Components style themselves with the semantic Tailwind classes
  (`bg-ats-surface`, `text-ats-ink`, `border-ats-line`) so they work in both
  schemes without `dark:` variants.
- Primitives here are hand-rolled rather than generated from shadcn/ui, and
  the package stays dependency-free (`cn()` instead of `clsx`/`tailwind-merge`).
  See `docs/architecture/frontend-architecture.md` before adding a UI
  dependency.
- Components here must be generic and reusable across apps. If something is
  specific to the marketing site, it belongs in `apps/web/src/features`,
  not here.
- Every component must meet the accessibility bar in
  `docs/frontend/accessibility.md` (keyboard operable, visible focus,
  sufficient contrast, respects `prefers-reduced-motion`).
- Breaking changes to a component's public props require a changeset entry
  and, if widely used, a heads-up in the PR description of downstream impact.

# Migration Policy

- All schema changes: `pnpm --filter @ats/api db:migrate` locally, which
  wraps `prisma migrate dev`. Commit the generated migration file.
- Staging/production apply migrations via `prisma migrate deploy` in the
  deploy pipeline (see `../deployment/deployment.md`) — never manually
  against a live database.
- **Additive changes** (new table, new nullable column) can ship in a
  normal PR with a migration.
- **Destructive changes** (dropping a column/table, changing a column type
  in a lossy way, renaming without a backward-compatible path) require:
  1. A written plan in this file (what breaks, rollout order, rollback
     plan).
  2. For anything affecting production data meaningfully, an ADR.
  3. A backward-compatible rollout where feasible (expand -> migrate data
     -> contract), rather than a single breaking migration.

# Change Management

## Adding a new API endpoint
1. Identify or create the owning module under `apps/api/src/modules/`.
2. Define/extend the Zod schema for request/response.
3. Implement route -> controller -> service -> repository, following
   `apps/api/AGENTS.md`.
4. Add unit + integration tests.
5. Update `docs/api/conventions.md` if a new pattern is introduced, and
   `docs/database/schema.md` if models changed.

## Adding a new frontend feature
1. Create `apps/web/src/features/<feature>/`.
2. Server Component by default; add `"use client"` only where needed.
3. Use shared brand components from `packages/ui`; only add new ones there
   if genuinely reusable.
4. Add component/integration tests; add a Playwright spec for critical
   flows.

## Modifying the database
1. Edit `apps/api/prisma/schema.prisma`.
2. `pnpm db:migrate` to generate the migration.
3. Update `docs/database/schema.md` (and `relationships.md` if
   relationships changed).
4. If destructive: follow `docs/database/migrations.md`.

## Creating an ADR
1. Copy `docs/decisions/ADR-0001-template.md` to the next numbered file.
2. Fill in Context / Decision / Alternatives / Consequences.
3. Open a PR for discussion before implementing.

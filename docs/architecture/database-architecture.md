# Database Architecture

PostgreSQL, accessed exclusively through Prisma from the `repository` layer
of each backend module.

## Environments

| Environment | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| Development | Local Docker Compose Postgres, seeded with sample data            |
| Test        | Ephemeral database used by integration tests (reset between runs) |
| Staging     | Mirrors production schema, safe for pre-release verification      |
| Production  | Live data                                                         |

## Migration policy

- All schema changes go through `prisma migrate dev` (local) and
  `prisma migrate deploy` (staging/production) — never hand-edited SQL
  against a live database.
- Destructive changes (dropped columns/tables) require a written migration
  plan in `../database/migrations.md` and, for anything non-trivial, an ADR.

See `../database/schema.md` for current models and
`../database/relationships.md` for the ERD.

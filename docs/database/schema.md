# Database Schema

Only models with a real, current business purpose exist. Do not add
speculative tables.

## `ContactSubmission`

Persists a visitor's contact/lead form submission (FR-001).

| Field     | Type     | Notes               |
| --------- | -------- | ------------------- |
| id        | uuid     | Primary key         |
| name      | string   | Required            |
| email     | string   | Required, validated |
| company   | string?  | Optional            |
| phone     | string?  | Optional            |
| message   | text     | Required            |
| createdAt | datetime | Audit field         |
| updatedAt | datetime | Audit field         |

No soft-delete on this table currently — deletions (e.g. for privacy
requests) are hard deletes, handled manually until a formal data-retention
process is defined (see `../requirements/non-functional-requirements.md`,
Privacy section — TBD).

## Conventions

- Every table has `id` (uuid), `createdAt`, `updatedAt`.
- Soft-delete (`deletedAt`) is added only for tables where "undo delete" or
  audit history is an actual product requirement — document the reason
  here when introduced.
- Foreign keys are always indexed.
- Enum-like fields use Prisma `enum` types, not free-text strings, when the
  value set is fixed and known.

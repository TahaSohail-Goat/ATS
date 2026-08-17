# AGENTS.md — apps/api (Express backend)

Extends the root `AGENTS.md`. Read that first.

## Scope
Modular monolith REST API under `/api/v1`.

## Structure (per module)
```
src/modules/<domain>/
  <domain>.routes.ts        Express router, wires HTTP -> controller
  <domain>.controller.ts    Parses request, calls service, shapes response
  <domain>.service.ts       Business logic
  <domain>.repository.ts    Data access (Prisma), no business logic
  <domain>.schema.ts        Zod schemas for request/response validation
  <domain>.types.ts         Module-local types
  <domain>.test.ts          Unit/integration tests
```

## Rules
- Controllers are thin. Business logic lives in services, not controllers or
  routes.
- Repositories are the only layer that talks to Prisma directly.
- Every route validates input with the module's Zod schema before it reaches
  the service.
- Errors are thrown as typed errors from `src/shared/errors` and caught by
  the centralized error middleware — do not `res.status().json()` errors
  directly from controllers.
- New modules require: a routes file wired into `src/routes/index.ts`, an
  entry in `docs/api/conventions.md` if they introduce new patterns, and an
  update to `docs/database/schema.md` if they add models.
- Do not add a module unless a real product requirement justifies it (see
  root `AGENTS.md` §6.3 — no functionality duplication, no premature
  abstraction).

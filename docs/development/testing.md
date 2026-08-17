# Testing Strategy

## Frontend (apps/web)
- **Unit/component tests:** Vitest + React Testing Library, co-located as
  `Component.test.tsx`.
- **Integration tests:** Vitest for feature-level logic (e.g. form
  validation + submission flow with a mocked API client).
- **E2E tests:** Playwright, in `apps/web/e2e/`, covering critical user
  journeys (e.g. "visitor submits contact form").

## Backend (apps/api)
- **Unit tests:** Vitest, per module, testing services in isolation
  (repository mocked).
- **Integration tests:** Vitest against a real test database (see
  `../database/README.md` — Test environment), testing the full
  route -> controller -> service -> repository path.
- **API tests:** supertest-style requests against the Express app for
  contract-level verification (status codes, response envelope shape).

## Conventions
- Test files: `*.test.ts` (unit/integration), `*.spec.ts` (Playwright E2E).
- Mock at the boundary (network, database), not internal implementation
  details — tests should survive refactors that preserve behavior.
- No arbitrary coverage percentage is enforced as a vanity metric; instead,
  every new FR/behavior change must ship with a corresponding test that
  would fail without the change.

## CI execution
`pnpm test` (unit/integration) runs on every PR. `pnpm test:e2e`
(Playwright) runs against a built preview in CI — see
`.github/workflows/ci.yml`.

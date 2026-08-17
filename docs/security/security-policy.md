# Security Policy (Engineering)

Baseline controls applied from day one, regardless of feature scope:

- **OWASP Top 10** mitigations are the minimum bar for every API endpoint.
- **Input validation:** Zod on every external input; nothing reaches
  business logic unvalidated.
- **Output handling:** React escapes output by default; never use
  `dangerouslySetInnerHTML` without sanitization and a documented reason.
- **SQL injection:** prevented structurally by using Prisma's parameterized
  queries exclusively — no raw string-concatenated SQL.
- **Headers:** Helmet-configured security headers (CSP, HSTS in
  staging/prod, X-Content-Type-Options, etc.).
- **CORS:** explicit origin allow-list via `CORS_ORIGIN`, never `*` outside
  local development.
- **Rate limiting:** applied to public write endpoints to mitigate abuse
  and basic DoS.
- **Dependency scanning:** automated via Dependabot and the CI security
  workflow (`.github/workflows/security.yml`).
- **Secrets:** see `secrets-management.md`. Never committed, never logged.
- **Audit logging:** structured logs capture who/what/when for state-
  changing requests (see `../operations/logging.md`).

Report a vulnerability: see root `SECURITY.md`.

# Security Architecture (Overview)

See `../security/security-policy.md` for the full policy. Summary of
architectural controls:

- **Transport:** HTTPS everywhere in staging/production.
- **Headers:** Helmet-configured security headers on every response.
- **CORS:** explicit allow-list via `CORS_ORIGIN`, not wildcard, in
  staging/production.
- **Rate limiting:** applied per-IP on public write endpoints (e.g.
  `/api/v1/contact`).
- **Input validation:** Zod at every API boundary; no unvalidated input
  reaches a service or repository.
- **Secrets:** environment variables only, never committed; see
  `../security/secrets-management.md`.
- **Auth (when introduced):** see `../security/authentication.md` — not yet
  implemented in v1 since there are no authenticated features.

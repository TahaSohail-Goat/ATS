# Threat Model (v1 — Marketing Site + Contact Form)

## Assets
- Contact submission data (names, emails, messages) — low-moderate
  sensitivity, but still PII.
- Site availability/reputation.

## Key threats
| Threat | Mitigation |
|---|---|
| Spam/abuse of contact form | Rate limiting, server-side validation, (future: CAPTCHA if abuse observed) |
| Injection (SQLi/XSS) | Prisma parameterized queries, React output escaping, Zod input validation |
| Data exposure via misconfigured CORS | Explicit origin allow-list |
| Secret leakage | `.env` gitignored, secrets store in deploy platform, Dependabot + CI security scan |
| Dependency vulnerabilities | Dependabot, `security.yml` CI workflow |

Threat model is revisited whenever authenticated features, payments, or
new external integrations are introduced.

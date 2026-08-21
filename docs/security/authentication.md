# Authentication (Security Perspective)

No authentication exists in the current frontend-only phase. If an
authenticated product is introduced later, define its threat model and
architecture in a new ADR before implementation. When implemented:

- Passwords hashed with argon2 or bcrypt (cost factor tuned per current
  best practice at implementation time), never stored reversibly.
- Sessions/tokens use `httpOnly`, `secure`, `sameSite=lax` (or `strict`
  where compatible with required cross-site flows) cookies, or short-lived
  JWTs with a documented refresh strategy — final choice via ADR.
- Login endpoints are rate-limited and do not leak whether an email exists
  (generic "invalid credentials" message).

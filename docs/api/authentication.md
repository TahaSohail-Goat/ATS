# API Authentication (Plan)

No authenticated endpoints exist in v1 (see `../product/scope.md`). This
document records the intended approach for when auth is needed, so it is
designed deliberately rather than bolted on.

## Planned approach
- Session-based or JWT — **final choice is TBD and requires an ADR** before
  implementation, per root `AGENTS.md` §9 ("changing authentication").
- Passwords, if introduced, are hashed with a modern algorithm (argon2 or
  bcrypt) — never stored in plain text or reversible encryption.
- Tokens/session cookies are `httpOnly`, `secure`, and `sameSite`
  appropriately scoped.

## Do not
- Implement a partial or ad hoc auth system to "unblock" an unscoped
  feature. Wait for the ADR.

# Deployment Process

1. PR merges to `main` after CI passes (lint, typecheck, unit/integration
   tests, build — see `.github/workflows/ci.yml`).
2. Staging deploy triggers automatically, running `prisma migrate deploy`
   before the new API version serves traffic.
3. Smoke test staging (manual or automated Playwright run against staging
   URL).
4. Production promotion is a manual, deliberate step (exact mechanism —
   platform promote, tag-based deploy, etc. — depends on the hosting
   provider decision, TBD).

Zero-downtime is achieved by running the new version alongside the old
during rollout (blue/green or rolling, depending on host) — database
migrations must therefore be backward-compatible with the previous API
version during the rollout window (see `../database/migrations.md`).
